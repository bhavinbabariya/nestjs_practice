import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { InsertUser } from 'src/decorators/user.decorator';
import { SellerGuard } from 'src/users/seller.guard';
import { User } from 'src/users/users.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { ProductService } from './product.service';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @ApiBearerAuth('Authorization')
  @ApiCreatedResponse({ description: 'product created succeessfully' })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @UseGuards(AuthGuard, SellerGuard)
  @Post('/create')
  createProduct(@Body() dto: CreateProductDto, @InsertUser() user: User) {
    return this.productService.create(dto.pName, dto.price, user);
  }
}
