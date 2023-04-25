
import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto } from './dto';
import { BasicResponse } from '../common/interfaces';

import { Product } from './entities';
import { PaginationDto } from '../common/dtos';

@Controller('products')
export class ProductsController {

  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return await this.productsService.create(createProductDto);
  }

  @Get()
  async findAll(
    @Query() paginationDto: PaginationDto
  ): Promise<Product[]> {
    return await this.productsService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseUUIDPipe) id: string
  ): Promise<Product> {
    return await this.productsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<Product> {
    return this.productsService.update(id, updateProductDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<BasicResponse> {
    return await this.productsService.remove(id);
  }

}
