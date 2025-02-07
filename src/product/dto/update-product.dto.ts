import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateProductData {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  name: string;

  @JoiSchema(Joi.number().required())
  @ApiProperty()
  price: number;

  @JoiSchema(Joi.number().required())
  @ApiProperty()
  count: number;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  description: string;
}

export class UpdateProductStatus {
  @JoiSchema(Joi.number().valid(-1, 1).required())
  @ApiProperty()
  status: number;
}

export interface UpdateOther {
  size: {
    str: { type: 'string' };
    color: { type: 'string' };
    count: { type: 'number' };
  };
  color: {
    str: { type: 'string' };
    count: { type: 'number' };
  };
  date: { type: 'string' };
}
