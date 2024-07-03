import { ApiProperty, PartialType } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateCategoryDto {
    @JoiSchema(Joi.string().required())
    @ApiProperty()
    name: string
}
