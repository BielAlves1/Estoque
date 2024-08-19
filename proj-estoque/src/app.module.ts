import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './produto/produto.module';
import { LocalidadeModule } from './localidade/localidade.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [ProdutoModule, LocalidadeModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
