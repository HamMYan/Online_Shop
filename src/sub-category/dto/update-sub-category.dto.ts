import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateSubCategoryDto {
  @ApiProperty()
  name: string;
}
  