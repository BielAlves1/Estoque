import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  Min,
} from 'class-validator';
import { Produto } from '../entities/produto.entity';

export class CreateProdutoDto extends Produto {
  // Faltou algumas definições de mensagens de validação.
  @ApiProperty({
    description: 'Nome do produto',
    maxLength: 50,
    example: 'Teclado foda Redragon',
  })
  @IsNotEmpty({ message: 'O nome do produto não pode estar vazio.' })
  @IsString({
    message: 'O nome do produto deve ser uma string.',
  })
  @MaxLength(50, {
    message: 'O nome do produto deve ter no máximo 50 caracteres.',
  })
  nome: string;

  @ApiProperty({
    description: 'Referência do produto',
    maxLength: 15,
    example: 'kb123',
  })
  @IsNotEmpty({ message: 'A referência não pode estar vazia.' })
  @IsString({
    message: 'A referência deve ser uma string.',
  })
  @MaxLength(50, { message: 'A referência deve ter no máximo 15 caracteres.' })
  referencia: string;

  @ApiProperty({
    description: 'Unidade de medida do produto',
    example: 'Unidade ou UN',
  })
  @IsNotEmpty({ message: 'A unidade de medida não pode estar vazia.' })
  @IsString({
    message: 'A unidade de medida deve ser uma string.',
  })
  unidade_medida: string;

  @ApiProperty({
    description: 'Valor de venda do produto',
    example: 59.9,
    minimum: 0,
  })
  @IsNotEmpty({ message: 'O valor de venda não pode estar vazio.' })
  @IsNumber(
    {},
    {
      message: 'O valor de venda deve ser um número.',
    },
  )
  @Min(0, { message: 'O valor de venda deve ser um número positivo.' })
  vlr_venda: number;

  @ApiProperty({
    description: 'Quantidade em estoque do produto',
    example: 100,
    minimum: 0,
    required: false,
  })
  @IsNumber(
    {},
    {
      message: 'O estoque deve ser um número.',
    },
  )
  @IsOptional()
  @Min(0, { message: 'O estoque deve ser um número positivo.' })
  estoque?: number;

  @ApiProperty({
    description: 'Fabricante do produto',
    example: 'Redragon',
    required: false,
  })
  @IsString({
    message: 'O fabricante deve ser uma string.',
  })
  @IsOptional()
  fabricante?: string;

  @ApiProperty({
    description: 'URL da imagem do produto',
    example: 'http://exemplo.com/imagem.png',
    required: false,
  })
  @IsString({
    message: 'A URL da imagem deve ser uma string.',
  })
  @IsOptional()
  image_url?: string;
}
