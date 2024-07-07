import { ApiProperty } from "@nestjs/swagger"
import * as Joi from "joi"
import { JoiSchema } from "nestjs-joi"
import { Product } from "src/product/entities/product.entity"

export class CreateFeedbackDto {
    @JoiSchema(Joi.string().required())
    @ApiProperty()
    text: string
}
