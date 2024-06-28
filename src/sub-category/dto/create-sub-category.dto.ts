import { ApiProperty } from "@nestjs/swagger"

export class CreateSubCategoryDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    category: string
}
