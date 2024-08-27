import { HttpService } from '@nestjs/axios';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { PrismaService } from 'src/database/prisma.service';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { Localidade } from './entities/localidade.entity';

@Injectable()
export class LocalidadeService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly httpService: HttpService,
  ) {}

  async findOrCreate(createLocalidadeDto: CreateLocalidadeDto) {
    const { municipio_nome } = createLocalidadeDto;

    // Falta validação!
    // Podendo ser ela manualmente, ou utilizando uma biblioteca como
    // class-validator junto ao class-transformer
    if (!municipio_nome) {
      throw new HttpException(
        'Nome do municipio obrigatório',
        HttpStatus.BAD_REQUEST,
      );
    }

    // Definição se vai ser utilizado padronizado em português ou inglês
    const existingLocalidades = await this.prisma.localidade.findMany({
      where: {
        municipio_nome,
      },
    });

    // Utilizar das Exceções de rota com HttpException
    if (existingLocalidades.length > 0) {
      throw new HttpException(
        {
          data: existingLocalidades,
        },
        HttpStatus.OK,
      );
    }

    const municiNomeFormat = municipio_nome
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/ç/g, 'c')
      .replace(/ /g, '-');

    let localidadeData;
    try {
      // Definir a URL da API no .env
      const ibgeURL = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municiNomeFormat}`;
      const response = await firstValueFrom(this.httpService.get(ibgeURL));
      localidadeData = response.data;
    } catch (error) {
      // Validação melhor de erros, dessa maneira vai dar Internal Server Error
      // quando ocorrer algum problema na api
      throw new HttpException(
        `Erro ao acessar a API do IBGE: ${error.message}`,
        HttpStatus.BAD_REQUEST,
      );
    }

    // Essa validação está estranha
    if (
      !localidadeData ||
      (Array.isArray(localidadeData) && localidadeData.length === 0) ||
      (typeof localidadeData === 'object' &&
        Object.keys(localidadeData).length === 0)
    ) {
      throw new NotFoundException(
        `Município ${municipio_nome} não encontrado na API do IBGE`,
      );
    }

    // Simplificar funcionalidade e utilizar tipagens
    // Esse é apenas um exemplo do que poderia ser feito

    const newLocalidades: Array<{
      municipio_id: number;
      municipio_nome: string;
      uf_id: number;
      uf_sigla: string;
      uf_nome: string;
    }> =
      localidadeData?.length > 0
        ? localidadeData.map((data) => ({
            municipio_id: data.id,
            municipio_nome: data.nome,
            uf_id: data.microrregiao.mesorregiao.UF.id,
            uf_sigla: data.microrregiao.mesorregiao.UF.sigla,
            uf_nome: data.microrregiao.mesorregiao.UF.nome,
          }))
        : localidadeData?.id
          ? [
              {
                municipio_id: localidadeData.id,
                municipio_nome: localidadeData.nome,
                uf_id: localidadeData.microrregiao.mesorregiao.UF.id,
                uf_sigla: localidadeData.microrregiao.mesorregiao.UF.sigla,
                uf_nome: localidadeData.microrregiao.mesorregiao.UF.nome,
              },
            ]
          : [];

    // Utilizar melhor as funções do prisma.
    const allLocalidades = await this.prisma.localidade.createManyAndReturn({
      data: newLocalidades,
      skipDuplicates: true,
      select: {
        municipio_id: true,
        municipio_nome: true,
        uf_id: true,
        uf_nome: true,
        uf_sigla: true,
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      data:
        allLocalidades && allLocalidades.length > 0
          ? allLocalidades
          : newLocalidades,
    };
  }

  async findAll() {
    const localidades = await this.prisma.localidade.findMany();

    if (localidades.length === 0) {
      throw new NotFoundException(
        'Não existe cidades cadastradas para listar.',
      );
    } else {
      return localidades;
    }
  }

  async findCity(nome: string): Promise<Localidade[]> {
    const localidades = await this.prisma.localidade.findMany({
      where: {
        municipio_nome: {
          contains: nome,
          mode: 'insensitive',
        },
      },
    });

    if (localidades.length === 0) {
      throw new NotFoundException(
        'Não existem cidades cadastradas para listar.',
      );
    }

    return localidades;
  }
}
