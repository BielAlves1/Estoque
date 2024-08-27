import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { PrismaService } from 'src/database/prisma.service';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
  constructor(private readonly prisma: PrismaService) { }

  async create(createProdutoDto: CreateProdutoDto): Promise<Produto> {
    const produto = await this.prisma.produto.create({
      data: { ...createProdutoDto },
    });

    if (!produto) {
      throw new HttpException('Erro ao criar produto!', HttpStatus.BAD_REQUEST);
    } else {
      return produto;
    }
  }

  async findAll(orderByParams?: { estoque?: string; vlr_venda?: string; nome?: string }) {
    let orderBy = [];

    if (orderByParams?.estoque) {
      orderBy.push({ estoque: orderByParams.estoque });
    }
    if (orderByParams?.vlr_venda) {
      orderBy.push({ vlr_venda: orderByParams.vlr_venda });
    }
    if (orderByParams?.nome) {
      orderBy.push({ nome: orderByParams.nome });
    }


    if (orderBy.length === 0) {
      orderBy = [];
    }

    const produtos = await this.prisma.produto.findMany({
      orderBy,
    });

    if (produtos.length === 0) {
      throw new NotFoundException('Não existem produtos cadastrados para listar.');
    } else {
      return produtos;
    }
  }

  async findOne(id: number) {
    const produto = await this.prisma.produto.findUnique({
      where: { id },
    });

    if (!produto) {
      throw new NotFoundException('Erro: Produto não encontrado.');
    } else {
      return produto;
    }
  }

  async findName(nome: string) {
    const produtos = await this.prisma.produto.findMany({
      where: {
        nome: {
          contains: nome,
          mode: 'insensitive',
        },
      },
    });

    if (produtos.length === 0) {
      throw new NotFoundException(
        'Erro: Nenhum produto encontrado com esse nome.',
      );
    } else {
      return produtos;
    }
  }

  async findReference(referencia: string) {
    const produtos = await this.prisma.produto.findMany({
      where: {
        referencia,
      },
    });

    if (produtos.length === 0) {
      throw new NotFoundException(
        'Erro: Nenhum produto encontrado com essa referencia.',
      );
    } else {
      return produtos;
    }
  }

  async findManufac(fabricante: string) {
    const produtos = await this.prisma.produto.findMany({
      where: {
        fabricante,
      },
    });

    if (produtos.length === 0) {
      throw new NotFoundException(
        'Erro: Nenhum produto encontrado deste fabricante.',
      );
    } else {
      return produtos;
    }
  }

  async update(id: number, updateProdutoDto: UpdateProdutoDto): Promise<Produto> {
    try {
      const produto = await this.prisma.produto.update({
        where: {
          id,
        },
        data: { ...updateProdutoDto },
      });

      return produto;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Produto com o ID '${id}' não encontrado para realizar alterações.`,
        );
      } else {
        throw new HttpException(
          'Erro ao alterar dados do produto.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }

  async remove(id: number) {
    try {
      const produto = await this.prisma.produto.delete({
        where: { id },
      });

      return {
        produto,
        message: 'Produto excluído com sucesso.',
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException(
          `Produto com o ID '${id}' não encontrado para ser excluído.`,
        );
      } else {
        throw new HttpException(
          'Erro ao excluir produto.',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
  }
}
