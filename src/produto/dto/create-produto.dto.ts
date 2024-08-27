import { IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { Produto } from "../entities/produto.entity";
import { ApiProperty } from "@nestjs/swagger";

export class CreateProdutoDto extends Produto {

    @ApiProperty({
        description: 'Nome do produto',
        maxLength: 50,
        example: 'Teclado foda Redragon',
    })
    @IsString()
    @IsNotEmpty({ message: 'O nome do produto não pode estar vazio.' })
    @MaxLength(50, { message: 'O nome do produto deve ter no máximo 50 caracteres.' })
    nome: string;

    @ApiProperty({
        description: 'Referência do produto',
        maxLength: 15,
        example: 'kb123',
    })
    @IsString()
    @IsNotEmpty({ message: 'A referência não pode estar vazia.' })
    @MaxLength(50, { message: 'A referência deve ter no máximo 15 caracteres.' })
    referencia: string;

    @ApiProperty({
        description: 'Unidade de medida do produto',
        example: 'Unidade ou UN',
    })
    @IsString()
    @IsNotEmpty({ message: 'A unidade de medida não pode estar vazia.' })
    unidade_medida: string;

    @ApiProperty({
        description: 'Valor de venda do produto',
        example: 59.90,
        minimum: 0,
    })
    @IsNumber()
    @IsNotEmpty({ message: 'O valor de venda não pode estar vazio.' })
    @Min(0, { message: 'O valor de venda deve ser um número positivo.' })
    vlr_venda: number;

    @ApiProperty({
        description: 'Quantidade em estoque do produto',
        example: 100,
        minimum: 0,
        required: false,
    })
    @IsNumber()
    @IsOptional()
    @Min(0, { message: 'O estoque deve ser um número positivo.' })
    estoque?: number;

    @ApiProperty({
        description: 'Fabricante do produto',
        example: 'Redragon',
        required: false,
    })
    @IsString()
    @IsOptional()
    fabricante?: string;

    @ApiProperty({
        description: 'URL da imagem do produto',
        example: 'http://exemplo.com/imagem.png',
        required: false,
    })
    @IsString()
    @IsOptional()
    image_url?: string;
}
