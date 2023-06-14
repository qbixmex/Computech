import { BadRequestException, Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Product } from './entities';
import { CreateProductDto, UpdateProductDto } from './dto';
import { BasicResponse } from '../common/interfaces';
import { PaginationDto } from '../common/dtos';

@Injectable()
export class ProductsService {

  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}

  async findAll(
    paginationDto: PaginationDto
  ): Promise<Product[]> {

    const { limit = 10, offset = 0 } = paginationDto;

    const products = await this.productRepository.find({
      take: limit,
      skip: offset,
    });

    return products.map(product => {
      return {
        id: product.id,
        title: product.title,
        slug: product.slug,
        brand: product.brand,
        color: product.color,
        price: product.price,
        description: product.description,
        images: product.images,
        condition: product.condition,
        stock: product.stock,
        published: product.published,
        category: product.category,
        tags: product.tags,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };
    });

  }

  async findOne(id: string): Promise<Product> {

    const product = await this.productRepository.findOneBy({ id });

    if (!product) throw new NotFoundException(`Product with id: <${ id }> not found!`);
    
    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      brand: product.brand,
      color: product.color,
      price: product.price,
      description: product.description,
      images: product.images,
      condition: product.condition,
      stock: product.stock,
      published: product.published,
      category: product.category,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {

      const product = this.productRepository.create(createProductDto);

      await this.productRepository.save(product);

      return {
        id: product.id,
        title: product.title,
        slug: product.slug,
        brand: product.brand,
        color: product.color,
        price: product.price,
        description: product.description,
        images: product.images,
        condition: product.condition,
        stock: product.stock,
        published: product.published,
        category: product.category,
        tags: product.tags,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      };

    } catch (error) {
      this.handleDBExceptions(error);
    }

  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {

    const product = await this.productRepository.preload({ id, ...updateProductDto });

    product.updatedAt = String(new Date().getTime());

    await this.productRepository.save(product);

    return {
      id: product.id,
      title: product.title,
      slug: product.slug,
      brand: product.brand,
      color: product.color,
      price: product.price,
      description: product.description,
      images: product.images,
      condition: product.condition,
      stock: product.stock,
      published: product.published,
      category: product.category,
      tags: product.tags,
      createdAt: product.createdAt,
      updatedAt: product.updatedAt,
    };

  }

  async remove(id: string): Promise<BasicResponse> {

    const product = await this.findOne(id);

    await this.productRepository.remove(product);

    return {
      ok: true,
      message: `Product with <${id}> product deleted successfully!`
    };

  }

  async removeProducts() {
    const queryBuilder = this.productRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private handleDBExceptions( error: any ) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException('Unexpected error, check console logs!');
  }

}
