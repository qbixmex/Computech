import { PartialType } from '@nestjs/mapped-types';
import CreateProductDto from './create-product.dto';

class UpdateProductDto extends PartialType(CreateProductDto) {}

export default UpdateProductDto;

