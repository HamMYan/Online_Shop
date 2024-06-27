import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";

export type ManagerDocument = HydratedDocument<Manager>;

@Schema()
export class Manager {
    _id: string
    @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'User' }] })
    user: User
    @Prop()
    description: string
    @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }] })
    product: Product[]
    @Prop()
    payment: string
}

export const ManagerSchema = SchemaFactory.createForClass(Manager)