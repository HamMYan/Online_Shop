import { ApiProperty } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema, JoiPipeModule, JoiSchemaOptions } from 'nestjs-joi';
import { Role } from '../entities/role-enum';

// @JoiSchemaOptions({})
export class CreateUserDto {

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

  @JoiSchema(Joi.array().items(1,2).required())
  @ApiProperty()
  role: Role[];

  @JoiSchema(Joi.string().min(6).max(8).valid(Joi.ref("password")).required())
  @ApiProperty()
  coniformPassword: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  phoneNumber: string;

  @JoiSchema(Joi.string())
  @ApiProperty()
  description: string;
}
