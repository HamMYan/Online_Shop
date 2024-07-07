import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Customer } from "src/customer/entities/customer.entity";
import { Product } from "src/product/entities/product.entity";
import { Role } from "src/user/entities/role-enum";

export type FeedBackDocument = HydratedDocument<Feedback>;

@Schema()
export class Feedback {
    @Prop()
    text: string

    @Prop()
    role: Role

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product' })
    product: Product

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
    customer: Customer
}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback)