import { Test } from '@nestjs/testing';
import { ProductsController } from '../products.controller';
import { ProductsService } from '../products.service';
import { products, newProduct, createdProduct, productDeletedResponse } from './fixtures';

describe('CatsController', () => {

  let productsController: ProductsController;
  let productsService: ProductsService;

  beforeEach(async () => {

    const moduleRef = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService]
    }).compile();

    productsService = moduleRef.get<ProductsService>(ProductsService)
    productsController = moduleRef.get<ProductsController>(ProductsController)

  });

  test('products controller should be defined', () => {
    expect(productsController).toBeDefined();
  });

  describe('findAll', () => {

    test('should return an array of products', async () => {
      jest.spyOn(productsService, 'findAll').mockImplementation(() => products);
      expect(await productsController.findAll()).toBe(products);
    });

    test('should return a product', async () => {
      jest.spyOn(productsService, 'findOne').mockImplementation(() => products[0]);
      expect(await productsController.findOne('abc')).toBe(products[0]);
    });

    test('should return a new product', async () => {
      jest.spyOn(productsService, 'create').mockImplementation(() => createdProduct);
      expect(await productsController.create(newProduct)).toEqual(createdProduct);
    });

    test('should return a updated product', async () => {
      jest.spyOn(productsService, 'update').mockImplementation(() => products[0]);
      expect(await productsController.update('abc', {})).toBe(products[0]);
    });

    test('should return a deleted product', async () => {
      jest.spyOn(productsService, 'remove').mockImplementation(() => productDeletedResponse);
      expect(await productsController.remove('abc')).toBe(productDeletedResponse);
    });

  });
});