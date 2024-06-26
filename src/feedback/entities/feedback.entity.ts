import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type FeedBackDocument = HydratedDocument<Feedback>;

@Schema()
export class Feedback {}

export const FeedbackSchema = SchemaFactory.createForClass(Feedback)