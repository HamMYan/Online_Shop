import { ApiProperty } from "@nestjs/swagger"

export class CreateUserDto {
    @ApiProperty()
    firstName: string
    @ApiProperty()
    lastName: string
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    phoneNumber: string
}
