export class Produto {
    id: number;
    nome: string;
    referencia: string;
    unidade_medida: string;
    vlr_venda: number;
    estoque?: number;
    fabricante?: string;
    image_url?: string;
}
