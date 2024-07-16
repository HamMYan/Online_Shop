import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateFeedbackDto } from './create-feedback.dto';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class UpdateFeedbackDto {
    @JoiSchema(Joi.string().required())
    @ApiProperty()
    text: string
}
