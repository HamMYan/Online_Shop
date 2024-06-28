import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Card } from 'src/card/entities/card.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Order } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

export type CustomerDocument = HydratedDocument<Customer>;
export interface Payment {
  number: string;
  name: string;
  date: string;
  cvv: number;
}

@Schema()
export class Customer {
  _id: string;

  @Prop({ type: mongoose.Schema.ObjectId, ref: 'User' })
  user: User;

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Product' }] })
  wish: Product[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Card' }] })
  card: Card[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Order' }] })
  order: Order[];

  @Prop({ type: [{ type: mongoose.Schema.ObjectId, ref: 'Feedback' }] })
  feedback: Feedback[];

  @Prop([
    raw({
      number: { type: String },
      name: { type: String },
      date: { type: String },
      cvv: { type: Number },
    }),
  ])
  payment: Payment[];
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
