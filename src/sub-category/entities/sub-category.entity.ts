import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema()
export class SubCategory {}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory)