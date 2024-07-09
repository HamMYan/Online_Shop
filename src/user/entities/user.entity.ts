import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Role } from "./role-enum";
import { Manager } from "src/manager/entities/manager.entity";
import { Customer } from "src/customer/entities/customer.entity";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    firstName: string

    @Prop()
    lastName: string

    @Prop()
    age: number

    @Prop()
    username: string

    @Prop()
    password: string

    @Prop()
    image: string

    @Prop()
    role: Role[]

    @Prop({ default: false })
    isVerify: boolean

    @Prop()
    code: string

    @Prop()
    phoneNumber: string

    @Prop({type:mongoose.Schema.ObjectId,ref:'Manager'})
    manager: Manager
    
    @Prop({type:mongoose.Schema.ObjectId,ref:'Customer'})
    customer: Customer
}

export const UserSchema = SchemaFactory.createForClass(User)