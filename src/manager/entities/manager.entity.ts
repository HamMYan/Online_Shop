import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Payment } from "src/customer/entities/customer.entity";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export type ManagerDocument = HydratedDocument<Manager>;

@Schema()
export class Manager {
    _id: string
    @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
    user: User
    @Prop()
    description: string
    @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }] })
    product: Product[]
    
    @Prop(raw({
        number: { type: String },
        name: { type: String },
        date: { type: String },
        cvv: { type: Number }
      }))
    payment: Payment;
      
}

export const ManagerSchema = SchemaFactory.createForClass(Manager)