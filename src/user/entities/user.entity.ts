import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "./role-enum";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop()
    firstName: string
    @Prop()
    lastName: string
    @Prop()
    username: string
    @Prop()
    password: string
    @Prop()
    image: string
    @Prop({ default: Role.CUSTOMER })
    role: [Role.ADMIN, Role.MANAGER, Role.CUSTOMER]
    @Prop({ default: false })
    isVerify: boolean
    @Prop()
    code: string
    @Prop()
    phoneNumber: string
}

export const UserSchema = SchemaFactory.createForClass(User)