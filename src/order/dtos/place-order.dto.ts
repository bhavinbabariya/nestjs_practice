import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsInt,
  ValidateNested,
  ArrayNotEmpty,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CartItem {
  @IsNotEmpty()
  @IsInt()
  readonly pId: number;

  @IsNotEmpty()
  @IsInt()
  readonly quantity: number;
}

export class PlaceOrderDto {
  @ApiProperty({
    type: [CartItem],
    description: 'cart item',
    example: `[
      {
        "pId": 8,
        "quantity": 10
      },
      {
        "pId": 4,
        "quantity": 20
      }
    ]`,
  })
  @IsNotEmpty()
  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CartItem)
  readonly cart: CartItem[];

  @ApiProperty({
    type: String,
    description: 'address',
    example: '6 , bansari residency, bopal, ahmedabad 326598',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
