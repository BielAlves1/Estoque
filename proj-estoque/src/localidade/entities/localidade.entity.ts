import { ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Produto } from 'src/produto/entities/produto.entity';

export class Localidade {
    municipio_id: number;
    municipio_nome: string;
    uf_id: number;
    uf_nome: string;

    @ValidateNested({ each: true })
    @Type(() => Produto)
    produtos?: Produto[];
}
