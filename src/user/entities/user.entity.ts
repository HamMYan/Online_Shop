import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type StudentDocument = HydratedDocument<User>;

@Schema()
export class User {}

export const UserSchema = SchemaFactory.createForClass(User)