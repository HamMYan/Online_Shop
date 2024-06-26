import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {}

export const OrderSchema = SchemaFactory.createForClass(Order)