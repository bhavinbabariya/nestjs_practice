import { IsNotEmpty, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    type: String,
    description: 'Product Name',
    example: 'No.1 Soap',
  })
  @IsNotEmpty()
  @IsString()
  readonly pName: string;

  @ApiProperty({
    type: Number,
    description: 'price',
    example: 99,
  })
  @IsNotEmpty()
  @Min(0)
  readonly price: number;
}
