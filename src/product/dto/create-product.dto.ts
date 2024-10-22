import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { UpdateOther } from './update-product.dto';

export class CreateProductDto {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  name: string;

  @ApiProperty()
  images: string[];

  @JoiSchema(Joi.number().required())
  @ApiProperty()
  price: number;

  @JoiSchema(Joi.number().required())
  @ApiProperty()
  count: number;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  description: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  subCategory: string;


  @ApiProperty()
  other: UpdateOther
}
