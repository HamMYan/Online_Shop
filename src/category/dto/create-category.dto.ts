import { ApiProperty } from "@nestjs/swagger"
import { Product } from "src/product/entities/product.entity"

export class CreateCategoryDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    image: string
}

