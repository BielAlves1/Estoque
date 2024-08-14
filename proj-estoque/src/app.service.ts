import { Injectable } from '@nestjs/common';
const municipioTest = [
  {
    id: 5200050,
    nome: 'Abadia de Goiás',
    microrregiao: {
      id: 52010,
      nome: 'Goiânia',
      mesorregiao: {
        id: 5203,
        nome: 'Centro Goiano',
        UF: {
          id: 52,
          sigla: 'GO',
          nome: 'Goiás',
          regiao: {
            id: 5,
            sigla: 'CO',
            nome: 'Centro-Oeste',
          },
        },
      },
    },
    'regiao-imediata': {
      id: 520001,
      nome: 'Goiânia',
      'regiao-intermediaria': {
        id: 5201,
        nome: 'Goiânia',
        UF: {
          id: 52,
          sigla: 'GO',
          nome: 'Goiás',
          regiao: {
            id: 5,
            sigla: 'CO',
            nome: 'Centro-Oeste',
          },
        },
      },
    },
  },
];

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
