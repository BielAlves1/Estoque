import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CreateProdutoDto } from './dto/create-produto.dto';
import { UpdateProdutoDto } from './dto/update-produto.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('produto')
@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) { }

  @Post('create')
  @ApiOperation({ summary: 'Cria um novo produto.' })
  @ApiResponse({ status: 201, description: 'Produto criado com sucesso.' })
  @ApiResponse({ status: 400, description: 'Dados inválidos.' })
  create(@Body() createProdutoDto: CreateProdutoDto) {
    return this.produtoService.create(createProdutoDto);
  }

  @Get('read')
  @ApiOperation({ summary: 'Lista todos os produtos.' })
  @ApiQuery({ name: 'estoque', required: false, description: 'Filtra produtos por estoque' })
  @ApiQuery({ name: 'vlr_venda', required: false, description: 'Filtra produtos por valor de venda' })
  @ApiQuery({ name: 'nome', required: false, description: 'Filtra produtos por nome' })
  @ApiResponse({ status: 200, description: 'Lista de produtos retornada com sucesso.' })
  findAll(@Query('estoque') estoque?: string, @Query('vlr_venda') vlr_venda?: string, @Query('nome') nome?: string) {
    return this.produtoService.findAll({ estoque, vlr_venda, nome });
  }

  @Get('read-one/:id')
  @ApiOperation({ summary: 'Retorna um produto por ID' })
  @ApiParam({ name: 'id', description: 'ID do produto como parâmetro' })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findOne(@Param('id') id: string) {
    return this.produtoService.findOne(+id);
  }

  @Get('read-name/:nome')
  @ApiOperation({ summary: 'Retorna um produto por nome' })
  @ApiParam({ name: 'nome', description: 'Nome do produto' })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findName(@Param('nome') nome: string) {
    return this.produtoService.findName(nome);
  }

  @Get('read-reference/:referencia')
  @ApiOperation({ summary: 'Retorna um produto por referência' })
  @ApiParam({ name: 'referencia', description: 'Referência do produto' })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findReference(@Param('referencia') referencia: string) {
    return this.produtoService.findReference(referencia);
  }

  @Get('read-fabricante/:fabricante')
  @ApiOperation({ summary: 'Retorna um produto por fabricante' })
  @ApiParam({ name: 'fabricante', description: 'Fabricante do produto' })
  @ApiResponse({ status: 200, description: 'Produto retornado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  findManufac(@Param('fabricante') fabricante: string) {
    return this.produtoService.findManufac(fabricante);
  }

  @Get('read-image')
  @ApiOperation({ summary: 'Lista produtos filtrados por disponibilidade de imagem.' })
  @ApiQuery({ name: 'image_url', required: false, description: 'Filtra produtos por imagem disponível (true para produtos com imagem, false para produtos sem imagem)' })
  @ApiResponse({ status: 200, description: 'Lista de produtos filtrados por imagem retornada com sucesso.' })
  findByImage(@Query('image_url') image_url?: string) {
    const hasImage = image_url === 'true';
    return this.produtoService.findByImage(hasImage);
  }

  @Patch('update/:id')
  @ApiOperation({ summary: 'Atualiza/altera informações de um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto alterado/atualizado com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado para realizar alteração.' })
  update(@Param('id') id: string, @Body() updateProdutoDto: UpdateProdutoDto) {
    return this.produtoService.update(+id, updateProdutoDto);
  }

  @Delete('delete/:id')
  @ApiOperation({ summary: 'Remove um produto' })
  @ApiParam({ name: 'id', description: 'ID do produto' })
  @ApiResponse({ status: 200, description: 'Produto removido com sucesso.' })
  @ApiResponse({ status: 404, description: 'Produto não encontrado.' })
  remove(@Param('id') id: string) {
    return this.produtoService.remove(+id);
  }
}
