import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Integração com API do IBGE + CRUD de produtos(estoque) - API')
    .setDescription(
      'Documentação de API gerada para cadastro e consulta de produtos e integração com API do IBGE de localidades.',
    )
    .setVersion('1.0')
    .addTag('produto')
    .addTag('localidade')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  // Adicionar possibilidade de configurar porta
  await app.listen(process.env.PORT || 3000).then(() => {
    // Adicionar mensagem de inicialização e qual a porta que a aplicação está rodando
    console.log(`Application is running on: ${process.env.PORT}`);
  });
}
bootstrap();
