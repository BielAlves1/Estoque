import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { CreateLocalidadeDto } from './dto/create-localidade.dto';
import { UpdateLocalidadeDto } from './dto/update-localidade.dto';

@Controller('localidade')
export class LocalidadeController {
  constructor(private readonly localidadeService: LocalidadeService) {}

  @Post('read-create')
  findOrCreate(@Body() createLocalidadeDto: CreateLocalidadeDto) {
    return this.localidadeService.findOrCreate(createLocalidadeDto);
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
