import { Module } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { FeedbackController } from './feedback.controller';
import { FeedbackSchema } from './entities/feedback.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Feedback', schema: FeedbackSchema }])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
