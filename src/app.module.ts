import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ServeStaticModule } from '@nestjs/serve-static';

import { ProductsModule } from './products/products.module';

@Module({

  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST ?? null,
      port: Number(process.env.DB_PORT) ?? null,
      database: process.env.DB_NAME ?? null,
      username: process.env.DB_USERNAME ?? null,
      password: process.env.DB_PASSWORD ?? null,
      autoLoadEntities: Boolean(process.env.DB_AUTO_LOAD_ENTITIES) ?? null,
      synchronize: Boolean(process.env.DB_SYNCHRONIZE) ?? null,
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),

    ProductsModule
  ],
  controllers: [],
  providers: [],

})
export class AppModule {}
