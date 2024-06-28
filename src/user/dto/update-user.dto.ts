import { ApiProperty, PartialType } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto {

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  firstName: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  lastName: string;

  @JoiSchema(Joi.string().email().required())
  @ApiProperty()
  username: string;

  @JoiSchema(Joi.string().min(6).max(8).required())
  @ApiProperty()
  password: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  phoneNumber: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  description: string;
}
