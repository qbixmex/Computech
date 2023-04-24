import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as UUID, validate as isUUID } from 'uuid';

import { Product, products } from './data';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { BasicResponse } from 'src/common/interfaces';

@Injectable()
export class ProductsService {

  create(createProductDto: CreateProductDto): Product {

    const product: Product = {
      id: UUID(),
      ...createProductDto,
      createdAt: new Date().getTime(),
      updatedAt: new Date().getTime(),
    };

    //* Add product to products array
    products.push(product);

    return product;

  }

  findAll(): Product[] {
    return products;
  }

  findOne(id: string): Product {

    const product = products.find(product => (product.id === id));

    if (!isUUID(id)) throw new BadRequestException(`<${ id }> is not a valid UUID!`);

    if (!product) throw new NotFoundException(`Product with id: <${ id }> not found!`);
    
    return product;

  }

  update(id: string, updateProductDto: UpdateProductDto): any {
    return `This action updates a #${id} product`;
  }

  remove(id: string): BasicResponse {
    return {
      ok: true,
      message: `Product with <${id}> product deleted successfully!`
    };
  }

}
