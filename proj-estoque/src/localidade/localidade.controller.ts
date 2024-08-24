import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { Response } from 'express';

@Controller('localidade')
export class LocalidadeController {
  constructor(private readonly localidadeService: LocalidadeService) { }

  @Post('read-create')
  async findOrCreate(@Body() createLocalidadeDto: CreateLocalidadeDto, @Res() res: Response) {
    const result = await this.localidadeService.findOrCreate(createLocalidadeDto);

    if (result.statusCode === HttpStatus.OK) {
      return res.status(HttpStatus.OK).json(result);
    } else {
      return res.status(HttpStatus.CREATED).json(result);
    }
  }

  @Get('read-all')
  findAll() {
    return this.localidadeService.findAll();
  }

  @Get('read-city/:nome')
  findCity(@Param('nome') nome: string) {
    return this.localidadeService.findCity(nome);
  }
}
