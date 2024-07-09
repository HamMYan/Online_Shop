import { ApiProperty, PartialType } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateUserDto {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  firstName: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  lastName: string;

  @JoiSchema(Joi.number().required())
  @ApiProperty()
  age: number;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  phoneNumber: string;
}


export class Login {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  username: string;

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  password: string;
}


export class UpdtaeUserPassword {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  oldPassword: string

  @JoiSchema(Joi.string().min(6).max(8).required())
  @ApiProperty()
  newPassword: string

  @JoiSchema(Joi.string().valid(Joi.ref("newPassword")).required())
  @ApiProperty()
  confirmPassword: string
}


export class ResetPassword {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  code: string

  @JoiSchema(Joi.string().min(6).max(8).required())
  @ApiProperty()
  newPassword: string

  @JoiSchema(Joi.string().valid(Joi.ref('newPassword')).required())
  @ApiProperty()
  confirmPassword: string
}