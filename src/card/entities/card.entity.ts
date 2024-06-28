import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Product } from 'src/product/entities/product.entity';

export type CardDocument = HydratedDocument<Card>;

@Schema()
export class Card {
  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }] })
  product: Product[];
  @Prop({ default: 1 })
  quantity: number;
}

export const CardSchema = SchemaFactory.createForClass(Card);
