import { ApiProperty } from "@nestjs/swagger";

export class CreateCustomerDto {
    @ApiProperty()
    card: string[];
    @ApiProperty()
    payment: string[]
}
