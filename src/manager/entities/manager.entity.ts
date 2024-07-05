import { Prop, raw, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Payment } from "src/customer/entities/customer.entity";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export type ManagerDocument = HydratedDocument<Manager>;

@Schema()
export class Manager {
    _id: string
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    user: User
    @Prop()
    description: string
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    product: Product[]
    
    @Prop()
    cardNumber: string;
      
}

export const ManagerSchema = SchemaFactory.createForClass(Manager)