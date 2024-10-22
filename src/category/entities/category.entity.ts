import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Product } from "src/product/entities/product.entity";
import { SubCategory } from "src/sub-category/entities/sub-category.entity";

export type CategoryDocument = HydratedDocument<Category>;

@Schema()
export class Category {
    @Prop()
    name: string
    
    @Prop()
    image: string

    @Prop({type:[{ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' }]})
    subCategory: SubCategory[]
}

export const CategorySchema = SchemaFactory.createForClass(Category)