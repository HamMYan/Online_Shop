import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ManagerDocument = HydratedDocument<Manager>;

@Schema()
export class Manager {}

export const ManagerSchema = SchemaFactory.createForClass(Manager)