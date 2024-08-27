import { Injectable } from '@nestjs/common';
const municipioTest = [
  {
    'municipio-id': 1100015,
    'municipio-nome': "Alta Floresta D'Oeste",
    'microrregiao-id': 11006,
    'microrregiao-nome': 'Cacoal',
    'mesorregiao-id': 1102,
    'mesorregiao-nome': 'Leste Rondoniense',
    'regiao-imediata-id': 110005,
    'regiao-imediata-nome': 'Cacoal',
    'regiao-intermediaria-id': 1102,
    'regiao-intermediaria-nome': 'Ji-Paraná',
    'UF-id': 11,
    'UF-sigla': 'RO',
    'UF-nome': 'Rondônia',
    'regiao-id': 1,
    'regiao-sigla': 'N',
    'regiao-nome': 'Norte',
  },
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
