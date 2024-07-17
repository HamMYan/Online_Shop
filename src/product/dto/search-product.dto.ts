import { ApiProperty } from "@nestjs/swagger";

export class SearchProduct {
  @ApiProperty({required:false})
  subCategory: string;

  @ApiProperty({required:false})
  name: string;

  @ApiProperty({required:false})
  minPrice: string;

  @ApiProperty({required:false})
  maxPrice: string;

  @ApiProperty({required:false})
  page: number;

  @ApiProperty({required:false})
  limit: number;
}
