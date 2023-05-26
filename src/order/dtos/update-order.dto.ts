import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    type: Number,
    description: 'id',
    example: 5,
  })
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    description: 'address',
    example: '6 , bansari residency, bopal, ahmedabad 326598',
  })
  @IsString()
  address?: string;

  @ApiProperty({
    type: String,
    description: 'status',
    example: 'dispatched',
  })
  @IsString()
  status?: 'pending' | 'dispatched' | 'fulfilled';
}
