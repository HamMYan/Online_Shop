import { ApiProperty } from "@nestjs/swagger";

export class CreateCardDto {
    @ApiProperty()
    quantity: number
}
