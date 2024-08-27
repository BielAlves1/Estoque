import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Adicionar uma mensagem de inicialização do prisma
    await this.$connect().then(() => console.log('Database connected'));
  }
}
