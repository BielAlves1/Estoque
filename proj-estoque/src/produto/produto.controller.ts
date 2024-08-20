import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post('create')
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get('read')
  findAll() {
    return this.produtoService.findAll();
  }

  @Get('read-one/:id')
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Get('read-name/:nome')
  findName(@Param('nome') nome: string) {
    return this.produtoService.findName(nome);
  }

  @Get('read-reference/:referencia')
  findReference(@Param('referencia') referencia: string) {
    return this.produtoService.findReference(referencia);
  }

  @Get('read-fabricante/:fabricante')
  findManufac(@Param('fabricante') fabricante: string) {
    return this.produtoService.findManufac(fabricante);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
