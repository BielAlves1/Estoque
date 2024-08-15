import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProdutoModule } from './modules/produto/produto.module';
import { ProdutoModule } from './produto/produto.module';
import { LocalidadeModule } from './localidade/localidade.module';

@Module({
  imports: [ProdutoModule, LocalidadeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
