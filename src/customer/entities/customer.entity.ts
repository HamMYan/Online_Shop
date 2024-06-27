import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
    _id: string
    @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
    user: User
    @Prop()
    total: number
    @Prop([{ type: mongoose.Schema.ObjectId, ref: 'Product' }])
    wish: Product[]
    
}

export const CustomerSchema = SchemaFactory.createForClass(Customer)
