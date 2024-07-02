import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ type: 'string', format: 'binary', description: 'Upload Images' })
  image: string;

  @ApiProperty()
  subCategory: string[]
}
