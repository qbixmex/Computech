import {
  IsArray, IsBoolean, IsIn, IsNumber, IsOptional,
  IsPositive, IsString, MinLength
} from 'class-validator';

import { ProductCondition } from '../data';

class CreateProductDto {

  @IsString()
  @MinLength(3)
  title: string;

  @IsString()
  @MinLength(3)
  slug: string;

  @IsString()
  @MinLength(2)
  brand: string;

  @IsString()
  @MinLength(3)
  color: string;

  @IsNumber()
  @IsPositive()
  price: number;

  @IsString()
  @MinLength(3)
  description: string;

  @IsString({ each: true })
  @IsArray()
  images: string[];

  @IsIn([ 'new', 'used', 'refurbished' ])
  condition: string;

  @IsNumber()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsBoolean()
  @IsOptional()
  published?: boolean;

  @IsString()
  @MinLength(3)
  category: string;

  @IsString({ each: true })
  @IsArray()
  @IsOptional()
  tags?: string[];

}

export default CreateProductDto;
