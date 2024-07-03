import { ApiProperty, PartialType } from '@nestjs/swagger';
import * as Joi from 'joi';
import { JoiSchema } from 'nestjs-joi';

export class UpdateManagerDto {
    @JoiSchema(Joi.string().required())
    @ApiProperty()
    description:string
}

export class UpdateManagerPayment{
    @JoiSchema(Joi.string().pattern(/^[0-9]{16}$/).required())
    @ApiProperty()
    cardNumber: string
}
