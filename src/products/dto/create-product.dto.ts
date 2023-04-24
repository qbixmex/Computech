export class CreateProductDto {
  id: string;
  title: string;
  slug: string;
  brand: string;
  color: string;
  price: number;
  description: string;
  images: string[];
  condition: 'new' | 'used' | 'refurbished';
  published: boolean;
  category: string;
  tags: string[];
  createdAt: string | number;
  updatedAt: string | number;
}
