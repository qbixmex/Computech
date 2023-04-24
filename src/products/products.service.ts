import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as UUID, validate as isUUID } from 'uuid';

import { Product, products } from './data';
import { CreateProductDto, UpdateProductDto } from './dto';
import { BasicResponse } from 'src/common/interfaces';

@Injectable()
export class ProductsService {

  private products = products;

  create(createProductDto: CreateProductDto): Product {

    const product: Product = {
      id: UUID(),
      ...createProductDto,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    //* Add product to products array
    this.products.push(product);

    return product;

  }

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: string): Product {

    const product = this.products.find(product => (product.id === id));

    if (!product) throw new NotFoundException(`Product with id: <${ id }> not found!`);
    
    return product;

  }

  update(id: string, updateProductDto: UpdateProductDto): Product {

    const productDB = this.findOne(id);

    const updatedProduct = {
      ...productDB,
      ...updateProductDto,
      updatedAt: new Date().getTime()
    };

    this.products = this.products.map(product => product.id === id ? updatedProduct : product)

    return updatedProduct;

  }

  remove(id: string): BasicResponse {
    return {
      ok: true,
      message: `Product with <${id}> product deleted successfully!`
    };
  }

}
