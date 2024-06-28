import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateSubCategoryDto } from './create-sub-category.dto';

export class UpdateSubCategoryDto {
  @ApiProperty()
  name: string;
  @ApiProperty()
  category: string;
}
