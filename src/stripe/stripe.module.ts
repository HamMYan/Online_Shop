import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { Product, ProductSchema } from 'src/product/entities/product.entity';
import { Card, CardSchema } from 'src/card/entities/card.entity';
import { Order, OrderSchema } from 'src/order/entities/order.entity';
import { OrderModule } from 'src/order/order.module';
import { CustomerSchema } from 'src/customer/entities/customer.entity';
import { CardModule } from 'src/card/card.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Product', schema: ProductSchema },
      { name: 'Card', schema: CardSchema },
      { name: 'Order', schema: OrderSchema },
      { name: 'Customer', schema: CustomerSchema },
    ]),
    OrderModule,
    CardModule,
  ],
  controllers: [StripeController],
  providers: [StripeService],
})
export class StripeModule {}
