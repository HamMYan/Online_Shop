import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './entities/feedback.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback') private feedbackModel: Model<Feedback>,
    @InjectModel('Product') private productModel: Model<Product>
  ) { }

  async create(createFeedbackDto: CreateFeedbackDto, product: string, req) {
    const { text } = createFeedbackDto
    const prod = await this.productModel.findOne({ id: product, status: 1 })

    if (!product) throw new BadRequestException('Product not found')

    const feedback = await this.feedbackModel.create({
      product,
      text,
      customer: req.user.id
    })

    await this.productModel.findByIdAndUpdate(product, {
      $push: { feedback }
    })

    return feedback
  }

  async findAll() {
    return `This action returns all feedback`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} feedback`;
  }

  async update(id: number, updateFeedbackDto: UpdateFeedbackDto) {
    return `This action updates a #${id} feedback`;
  }

  async remove(id: string, req) {
    const feedback = await this.feedbackModel.findById(id)

    if (!feedback) throw new BadRequestException('Feedback not found')
    if (feedback.customer.toString() !== req.user.id) throw new BadRequestException('You cannot delete this feedback because you did not install it')

    await this.feedbackModel.findByIdAndDelete(id)
    
    return { message: 'Your feedback is deleted' }
  }
}
