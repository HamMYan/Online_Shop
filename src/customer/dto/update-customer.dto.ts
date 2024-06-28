import { ApiProperty } from '@nestjs/swagger';
import { CreateCustomerDto } from './create-customer.dto';

export class UpdateCustomerDto{
    @ApiProperty()
    card: string[];
    @ApiProperty()
    payment: string[]
}
