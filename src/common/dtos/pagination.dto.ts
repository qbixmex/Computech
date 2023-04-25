import { Type } from 'class-transformer';
import { IsOptional, Min } from 'class-validator';

class PaginationDto {

  @Type(() => Number)
  @Min(0)
  @IsOptional()
  limit?: number;

  @Type(() => Number)
  @Min(0)
  @IsOptional()
  offset?: number;

}

export default PaginationDto;