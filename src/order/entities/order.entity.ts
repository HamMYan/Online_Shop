import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';

export type OrderDocument = HydratedDocument<Order>;

@Schema()
export class Order {
  @Prop()
  total: number; 

  @Prop()
  productName: string;

  @Prop()
  productImage: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'Product' })
  product: Product;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
