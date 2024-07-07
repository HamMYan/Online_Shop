import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackSchema } from './entities/feedback.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Feedback', schema: FeedbackSchema },
    { name: 'Product', schema: ProductSchema }
  ])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
