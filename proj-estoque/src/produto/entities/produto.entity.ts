export class Produto {
    id: number;
    nome: string;
    referencia: string;
    unidade_medida: string;
    vlr_venda: number;
    estoque?: number;
    fabricante?: string;
    municipio_fabricado?: string;
    uf_fabricado?: string;
    image_url?: string;
    localidade_id?: number;
}
