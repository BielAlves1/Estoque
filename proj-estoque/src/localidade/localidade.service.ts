import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalidadeService {
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) {}

  async findOrCreate(createLocalidadeDto: CreateLocalidadeDto) {
    const { municipio_nome } = createLocalidadeDto;

    const existingLocalidade = await this.prisma.localidade.findFirst({
      where: {
        municipio_nome
      },
    });

    if (existingLocalidade) {
      return existingLocalidade;
    }

    const municiNomeFormat = municipio_nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/ /g, '-'); 


    const ibgeURL = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municiNomeFormat}`;
    const response = await firstValueFrom(this.httpService.get(ibgeURL));

    const localidadeData = response.data;
    if (!localidadeData) {
      throw new NotFoundException(`Município ${municipio_nome} não encontrado na API do IBGE`);
    }

    const newLocalidade = {
      municipio_id: localidadeData.id,
      municipio_nome: localidadeData.nome,
      uf_id: localidadeData.microrregiao.mesorregiao.UF.id,
      uf_sigla: localidadeData.microrregiao.mesorregiao.UF.sigla,
      uf_nome: localidadeData.microrregiao.mesorregiao.UF.nome,
    };

    return await this.prisma.localidade.create({
      data: newLocalidade,
    });
  }

  async findAll() {
    const localidades = await this.prisma.localidade.findMany();

    if (localidades.length === 0) {
      throw new NotFoundException('Não existe cidades cadastradas para listar.');
    } else {
      return localidades;
    }
  }

  async findCity(nome: string) {
    const localidades = await this.prisma.localidade.findMany({
      where: {
        municipio_nome: {
          contains: nome,
          mode: 'insensitive',
        },
      },
    });

    return localidades;
  }
}
