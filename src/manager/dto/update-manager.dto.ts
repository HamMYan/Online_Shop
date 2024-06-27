import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateManagerDto } from './create-manager.dto';

export class UpdateManagerDto {
    @ApiProperty()
    description:string
    @ApiProperty()
    payment:string
}
