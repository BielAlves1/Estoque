import { Injectable } from '@nestjs/common';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';
import { PrismaService } from 'src/database/prisma.service';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LocalidadeService {
  constructor(private readonly prisma: PrismaService, private readonly httpService: HttpService) {}

  async findOrCreate(createLocalidadeDto: CreateLocalidadeDto) {
    const { municipio_nome, uf_nome } = createLocalidadeDto;

    const existingLocalidade = await this.prisma.localidade.findFirst({
      where: {
        municipio_nome,
        uf_nome,
      },
    });

    if (existingLocalidade) {
      return existingLocalidade;
    }

    const ibgeURL = `https://servicodados.ibge.gov.br/api/v1/localidades/municipios/${municipio_nome}`;
    const response = await firstValueFrom(this.httpService.get(ibgeURL));

    const [localidadeData] = response.data;
    if (!localidadeData) {
      throw new Error(
        `Município ${municipio_nome} não encontrado na API do IBGE`,
      );
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

  findAll() {
    return `This action returns all localidade`;
  }

  findOne(id: number) {
    return `This action returns a #${id} localidade`;
  }

  update(id: number, updateLocalidadeDto: UpdateLocalidadeDto) {
    return `This action updates a #${id} localidade`;
  }

  remove(id: number) {
    return `This action removes a #${id} localidade`;
  }
}
