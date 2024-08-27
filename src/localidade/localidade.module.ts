import { Module } from '@nestjs/common';
import { LocalidadeService } from './localidade.service';
import { LocalidadeController } from './localidade.controller';
import { HttpModule } from '@nestjs/axios';
import { PrismaService } from 'src/database/prisma.service';

@Module({
  imports: [HttpModule],
  controllers: [LocalidadeController],
  providers: [LocalidadeService, PrismaService],
})
export class LocalidadeModule {}
