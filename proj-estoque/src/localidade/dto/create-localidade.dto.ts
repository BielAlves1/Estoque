import { IsInt, IsString, ValidateNested, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProdutoDto } from 'src/produto/dto/create-produto.dto';

export class CreateLocalidadeDto {
    @IsInt()
    municipio_id: number;

    @IsString()
    municipio_nome: string;

    @IsInt()
    uf_id: number;

    @IsString()
    uf_sigla: string;

    @IsString()
    uf_nome: string;

    @IsOptional()
    @ValidateNested({ each: true })
    @Type(() => CreateProdutoDto)
    produtos?: CreateProdutoDto[]
}
