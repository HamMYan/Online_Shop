import { ApiProperty, PartialType } from '@nestjs/swagger';

export class UpdateManagerDto {
    @ApiProperty()
    description:string
    @ApiProperty()
    payment:string
}
