import { ApiProperty } from '@nestjs/swagger';
import { JoiSchema } from 'nestjs-joi';
import * as Joi from 'joi';

export class UpdateCustomerDto {
  @JoiSchema(Joi.array().items(Joi.string()).required())
  @ApiProperty()
  card: string[];
}

export class AddCustomerPayment {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  number: string;

  @JoiSchema(Joi.string().alphanum().uppercase().required())
  @ApiProperty()
  name: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  date: string;

  @JoiSchema(Joi.number().integer().min(100).max(999).required())
  @ApiProperty()
  cvv: number;
}
