import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
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

  @Prop(
    raw({
      size: [
        {
          type: {
            str: { type: String },
            color: { type: String },
            count: { type: Number },
          },
        },
      ],
      color: [{ type: { str: { type: String }, count: { type: Number } } }],
      date: { type: String },
    })
  )
  other:Record<string, any>

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory' })
  subCategory: SubCategory;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Manager' })
  manager: Manager;

  @Prop({ default: ProductStatus.PENDING })
  status: ProductStatus;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Feedback' }] })
  feedback: Feedback[];
}

export const ProductSchema = SchemaFactory.createForClass(Product);
