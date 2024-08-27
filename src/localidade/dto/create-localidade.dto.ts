import { IsInt, IsString, ValidateNested, IsOptional } from 'class-validator';

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
}
