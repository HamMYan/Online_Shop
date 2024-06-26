import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {}

export const CardSchema = SchemaFactory.createForClass(Card)