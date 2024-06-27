import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {
    @ApiProperty()
    firstName: string
    @ApiProperty()
    lastName: string
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
    @ApiProperty()
    image:string
    @ApiProperty()
    phoneNumber: string
}
