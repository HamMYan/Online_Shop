import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Feedback } from './entities/feedback.entity';
import { Product } from 'src/product/entities/product.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Order } from 'src/order/entities/order.entity';

@Injectable()
export class FeedbackService {
  constructor(
    @InjectModel('Feedback') private feedbackModel: Model<Feedback>,
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Customer') private customerModel: Model<Customer>,
    @InjectModel('Order') private orderModel: Model<Order>,
  ) { }

  async create(createFeedbackDto: CreateFeedbackDto, product: string, req) {
    const customer = await this.customerModel.findById(req.user.id)
    if (!customer) throw new BadRequestException('Customer not found')

    const { text } = createFeedbackDto
    const prod = await this.productModel.findOne({ id: product, status: 1 })

    if (!prod) throw new BadRequestException('Product not found')

    const order = await this.orderModel.findById(customer.order, {
      'order.productId': prod.id
    });

    if (!order) throw new BadRequestException('Order not found or product not in order')

    const feedback = await this.feedbackModel.create({
      product,
      text,
      customer: req.user.id
    })

    await this.customerModel.findByIdAndUpdate(req.user.id, {
      $push: { feedback }
    })

    await this.productModel.findByIdAndUpdate(product, {
      $push: { feedback }
    })

    return feedback
  }

  async update(id, userId, updateFeedbackDto) {
    const feedback = await this.feedbackModel.findById(id)
    if (!feedback) throw new BadRequestException('Feedback not found')
    if (feedback.customer.toString() !== userId) throw new BadRequestException('You are not the owner')

    const { text } = updateFeedbackDto
    const updatedFeedback = await this.feedbackModel.findByIdAndUpdate(id, { text })

    return {message:'Feedback updated'}
  }

  async remove(id: string, req) {
    const feedback = await this.feedbackModel.findById(id)

    if (!feedback) throw new BadRequestException('Feedback not found')
    if (feedback.customer.toString() !== req.user.id) throw new BadRequestException('You cannot delete this feedback because you did not install it')

    await this.feedbackModel.findByIdAndDelete(id)

    return { message: 'Your feedback is deleted' }
  }
}
