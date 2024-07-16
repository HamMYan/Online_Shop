import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackSchema } from './entities/feedback.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/entities/product.entity';
import { CustomerSchema } from 'src/customer/entities/customer.entity';
import { OrderSchema } from 'src/order/entities/order.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Feedback', schema: FeedbackSchema },
    { name: 'Product', schema: ProductSchema },
    { name: 'Customer', schema: CustomerSchema },
    { name: 'Order', schema: OrderSchema },
  ])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
  exports: [FeedbackService]
})
export class FeedbackModule { }
