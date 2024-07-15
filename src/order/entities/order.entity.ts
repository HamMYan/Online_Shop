import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { OrderStatus } from './order-status';

export type OrderDocument = HydratedDocument<Order>;

export interface OrderItem {
  price: number;
    productName: string;
    productImage: string;
    productId: string;
    quantity: number;
}

@Schema()
export class Order {
  @Prop()
  total: number;

  @Prop()
  status: OrderStatus;

  @Prop([
    raw({
      price: { type: Number },
      productName: { type: String },
      productImage: { type: String },
      productId: { type: String },
      quantity: { type: Number },
    }),
  ])
  order: {
    price: number;
    productName: string;
    productImage: string;
    productId: string;
    quantity: number;
  }[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' })
  customer: Customer;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
