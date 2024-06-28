import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Manager } from 'src/manager/entities/manager.entity';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { ProductStatus } from './status-enum';

export type ProductDocument = HydratedDocument<Product>;

@Schema()
export class Product {
  @Prop()
  name: string;

  @Prop()
  images: string[];

  @Prop()
  price: number;

  @Prop()
  count: number;

  @Prop()
  description: string;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'SubCategory' }] })
  subCategory: SubCategory[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Manager' }] })
  manager: Manager;

  @Prop({ default: ProductStatus.PENDING })
  status: ProductStatus;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Feedback' }] })
  feedback: Feedback[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
