import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateCategoryDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    image: string
}
