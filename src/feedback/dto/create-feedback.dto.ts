import { ApiProperty } from "@nestjs/swagger"
import { Product } from "src/product/entities/product.entity"

export class CreateFeedbackDto {
    @ApiProperty()
    product: Product
    @ApiProperty()
    text: string
}
