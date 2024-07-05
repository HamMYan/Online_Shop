import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Category } from "src/category/entities/category.entity";
import { Product } from "src/product/entities/product.entity";

export type SubCategoryDocument = HydratedDocument<SubCategory>;

@Schema()
export class SubCategory {
    @Prop()
    name: string

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Category' })
    category: Category

    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }] })
    products: Product[]
}

export const SubCategorySchema = SchemaFactory.createForClass(SubCategory)