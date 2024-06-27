import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';

export class UpdateFeedbackDto {
    @ApiProperty()
    text: string
}
