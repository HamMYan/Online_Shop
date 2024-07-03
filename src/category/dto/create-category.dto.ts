import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class CreateCategoryDto {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  name: string;
}
