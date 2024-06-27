import { ApiProperty } from "@nestjs/swagger";

export class CreateProductDto {
    @ApiProperty()
    name: string
    @ApiProperty()
    images: string[]
    @ApiProperty()
    price: number
    @ApiProperty()
    count: number
    @ApiProperty()
    description: string
    @ApiProperty()
    category: string[]
}
