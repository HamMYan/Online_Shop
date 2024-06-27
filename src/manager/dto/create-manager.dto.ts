import { ApiProperty } from "@nestjs/swagger"

export class CreateManagerDto {
    @ApiProperty()
    description:string
    @ApiProperty()
    payment:string
}
