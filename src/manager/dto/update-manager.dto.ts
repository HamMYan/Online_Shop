import { ApiProperty, PartialType } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateManagerData {
  @JoiSchema(Joi.string().optional())
  @ApiProperty()
  description: string;

  @JoiSchema(
    Joi.string()
      .pattern(/^[0-9]{16}$/)
      .optional(),
  )
  @ApiProperty()
  cardNumber: string;
}
