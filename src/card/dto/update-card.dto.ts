import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateCardDto } from './create-card.dto';

export class UpdateCardDto{
    @ApiProperty()
    quantity: number
}
