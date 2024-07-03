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

export class UpdateImage {
  @ApiProperty()
  image: string
}

export class UpdtaeUserPassword {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  oldPassword: string

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  newPassword: string

  @JoiSchema(Joi.string().valid(Joi.ref("newPassword")).required())
  @ApiProperty()
  confirmPassword: string
}

export class ResetPassword {
  @JoiSchema(Joi.string().required())
  @ApiProperty()
  code: number

  @JoiSchema(Joi.string().required())
  @ApiProperty()
  newPassword: number

  @JoiSchema(Joi.string().valid(Joi.ref('newPassword')).required())
  @ApiProperty()
  oldPassword: number
}