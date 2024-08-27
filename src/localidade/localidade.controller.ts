import { Controller, Get, Post, Body, Param, Res, HttpStatus } from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('localidade')
@Controller('localidade')
export class LocalidadeController {
  constructor(private readonly localidadeService: LocalidadeService) { }

  @ApiOperation({ summary: 'Busca ou cria uma localidade/cidade' })
  @ApiResponse({ status: 200, description: 'Localidade/cidade encontrada.' })
  @ApiResponse({ status: 201, description: 'Nova localidade/cidade criada.' })
  @Post('read-create')
  async findOrCreate(@Body() createLocalidadeDto: CreateLocalidadeDto, @Res() res: Response) {
    const result = await this.localidadeService.findOrCreate(createLocalidadeDto);

    if (result.statusCode === HttpStatus.OK) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.CREATED).json(result);
    }
  }

  @ApiOperation({ summary: 'Retorna todas as localidades/cidades cadastradas no banco de dados' })
  @ApiResponse({ status: 200, description: 'Lista de localidades/cidades retornadas com sucesso.' })
  @Get('read-all')
  findAll() {
    return this.localidadeService.findAll();
  }

  @ApiOperation({ summary: 'Busca uma cidade pelo nome no banco de dados' })
  @ApiParam({ name: 'nome', description: 'Nome da cidade', example: 'Caxias do Sul' })
  @ApiResponse({ status: 200, description: 'Cidade encontrada.' })
  @ApiResponse({ status: 404, description: 'Cidade não encontrada.' })
  @Get('read-city/:nome')
  findCity(@Param('nome') nome: string) {
    return this.localidadeService.findCity(nome);
  }
}
