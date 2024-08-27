import { IsInt, IsString, ValidateNested, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocalidadeDto {

    @ApiProperty({
        description: 'ID do município retornado da API do IBGE',
        example: 1234,
    })
    @IsInt()
    municipio_id: number;

    @ApiProperty({
        description: 'Nome do município retornado da API do IBGE',
        example: 'Caxias do Sul',
    })
    @IsString()
    municipio_nome: string;

    @ApiProperty({
        description: 'ID do estado (UF) retornado da API do IBGE',
        example: 35,
    })
    @IsInt()
    uf_id: number;

    @ApiProperty({
        description: 'Sigla do estado (UF) retornada da API do IBGE',
        example: 'RS',
    })
    @IsString()
    uf_sigla: string;

    @ApiProperty({
        description: 'Nome do estado(UF) retornado da API do IBGE',
        example: 'Rio Grande do Sul',
    })
    @IsString()
    uf_nome: string;
}
