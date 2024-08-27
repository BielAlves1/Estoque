import { Prisma } from '@prisma/client';

// Utilizar dessa maneira a importação,
// já que ela sera usada para criação de um registro no banco.
export class Produto implements Prisma.ProdutoUncheckedCreateInput {
  id?: number;
  nome: string;
  referencia: string;
  unidade_medida: string;
  vlr_venda: number;
  estoque?: number;
  fabricante?: string;
  image_url?: string;
}
