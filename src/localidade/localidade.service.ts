import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Localidade } from './entities/localidade.entity';
import { Response } from 'express';

@Injectable()
export class LocalidadeService {
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) { }

  async findOrCreate(createLocalidadeDto: CreateLocalidadeDto) {
    const { municipio_nome } = createLocalidadeDto;

    const existingLocalidades = await this.prisma.localidade.findMany({
      where: {
        municipio_nome,
      },
    });

    if (existingLocalidades.length > 0) {
      return {
        statusCode: HttpStatus.OK,
        data: existingLocalidades,
      };
    }

    const municiNomeFormat = municipio_nome.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/ç/g, 'c').replace(/ /g, '-');

    let localidadeData;
    try {
      const ibgeURL = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municiNomeFormat}`;
      const response = await firstValueFrom(this.httpService.get(ibgeURL));
      localidadeData = response.data;
    } catch (error) {
      throw new HttpException(`Erro ao acessar a API do IBGE: ${error.message}`, HttpStatus.BAD_REQUEST);
    }

    if (!localidadeData || !Array.isArray(localidadeData) || localidadeData.length === 0) {
      throw new NotFoundException(`Município ${municipio_nome} não encontrado na API do IBGE`);
    }

    const newLocalidades = localidadeData.map(data => ({
      municipio_id: data.id,
      municipio_nome: data.nome,
      uf_id: data.microrregiao.mesorregiao.UF.id,
      uf_sigla: data.microrregiao.mesorregiao.UF.sigla,
      uf_nome: data.microrregiao.mesorregiao.UF.nome,
    }));

    await this.prisma.localidade.createMany({
      data: newLocalidades,
      skipDuplicates: true,
    });

    const allLocalidades = await this.prisma.localidade.findMany({
      where: {
        municipio_nome,
      },
    });

    return {
      statusCode: HttpStatus.CREATED,
      data: allLocalidades,
    };
  }

  async findAll() {
    const localidades = await this.prisma.localidade.findMany();

    if (localidades.length === 0) {
      throw new NotFoundException('Não existe cidades cadastradas para listar.');
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
      throw new NotFoundException('Não existem cidades cadastradas para listar.');
    }

    return localidades;
  }
}
