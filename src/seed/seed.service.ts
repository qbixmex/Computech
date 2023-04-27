import { Injectable } from '@nestjs/common';

import { Product } from '../products/entities';
import { BasicResponse } from '../common/interfaces';
import { products } from './data';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class SeedService {

  constructor(
    private readonly productService: ProductsService
  ) {}

  async load(): Promise<BasicResponse> {

    await this.deleteTables();
    await this.insertTables();

    return {
      ok: true,
      message: 'Data loaded successfully!'
    };

  }

  private async deleteTables(): Promise<void> {
    this.productService.removeProducts();
  }

  private async insertTables(): Promise<void> {
    await this.insertProducts();
  }

  private async insertProducts(): Promise<void> {

    const insertPromises: Promise<Product>[] = [];

    products.forEach(product => {
      insertPromises.push(this.productService.create(product));
    });

    await Promise.all(insertPromises);

  }

}
