import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CardService } from 'src/card/card.service';
import { Card } from 'src/card/entities/card.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Order, OrderItem } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';
import { Product } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';
import Stripe from 'stripe';
import { PaymentDto, StripeData } from './dto/stripe.dto';

@Injectable()
export class StripeService {
  private stripe: Stripe;

  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Card') private cardModel: Model<Card>,
    @InjectModel('Customer') private customerModel: Model<Customer>,
    @InjectModel('Order') private orderModel: Model<Order>,
    private readonly orderService: OrderService,
    private readonly cardService: CardService,
  ) {
    this.stripe = new Stripe(
      'sk_test_51Pcodp2LJnWZDpMjcER3DTx2NZEaCXUbeF0Y2rgcHt6PE9Nz4aeO08Fxtf5QeBBf0KVQA4dAEBHuhMJa87RcXSWx00NvApwIES',
      {
        apiVersion: '2024-06-20',
      },
    );
  }
  // async checkout(payment:any) {
  //  console.log( payment.data);

  //   const data =  await this.stripe.checkout.sessions.create({
  //     line_items: payment.data,
  //     // [
  //       // {
  //       //   price_data: {
  //       //     currency: 'usd',
  //       //     product_data: {
  //       //       name: 'T-shirt',
  //       //     },
  //       //     unit_amount: 2000,
  //       //   },
  //       //   quantity: 1,
  //       // },
  //       // {
  //       //   price_data: {
  //       //     currency: 'usd',
  //       //     product_data: {
  //       //       name: 'T-good',
  //       //     },
  //       //     unit_amount: 5000,
  //       //   },
  //       //   quantity: 5,
  //       // },
  //     // ],
  //     mode: 'payment',
  //     success_url: 'http://localhost:3001/success',
  //     cancel_url: 'http://localhost:3001/cancel',
  //   })
  //   return {url: data.url}
  // }

  async createCharge(param: PaymentDto, userId: string) {
    const arr: StripeData[] = [];
    const customer = await this.customerModel.findById(userId);
    for (let e of param.data) {
      console.log(e);
      const card = await this.cardModel.findById(e).populate("customer").populate("product");
      if (!card ) {
        throw new BadRequestException('Ooops! card incorrect data');
      }
      const product = await this.productModel.findOne( card.product);
      if (!product) {
        throw new BadRequestException('Ooops! product incorrect data');
      }

      console.log(card.product);
      
      const data: StripeData = {
        price_data: {
          currency: param.currency,
          product_data: {
            name: card.product.name,
          },
          unit_amount: card.product.price,
        },
        quantity: card.quantity
      };
      console.log(card, data);

      arr.push(data);
    }
    console.log(arr);
    const products: OrderItem[] = [];
    for (let e of param.data) {
      const card = await this.cardModel.findById(e).populate("customer").populate("product");
      const product = await this.productModel.findOne(card.product);
      products.push({
        productName: product.name,
        productImage: product.images[0],
        quantity: card.quantity,
        price: card.product.price,
        productId: product._id,
      });
      await this.cardModel.findByIdAndDelete(card.id);
    }
    await this.orderModel.create({
      order: products,
      customer,
      total: products.reduce((a, b) => a + b.price * b.quantity, 0),
      status: 0,
    });
    const data = await this.stripe.checkout.sessions.create({
      line_items: arr,
      mode: 'payment',
      success_url: 'http://localhost:3000/stripe/success',
      cancel_url: 'http://localhost:3000/stripe/cancel',
    });
    return { url: data.url };
  }

  async success(userId: string) {
    console.log(userId);
    const user = await this.customerModel.findById(userId);
    if (user) {
      const arr = await this.orderModel
        .find({
          user,
          status: 0,
        })
        .populate('product')
        .populate('sizeId');
      await this.orderModel.findByIdAndUpdate(userId, { status: 1 });
      console.log(arr);
      return arr;
    } else {
      throw new NotFoundException('user not found');
    }
  }
  async cancel(userId: string) {
    const customer = await this.customerModel.findById(userId);
    if (customer) {
      const arr = await this.orderModel.find({
        customer,
        status: 0,
      });
      for (let e of arr) {
        for (let a of e.order) {
          await this.cardModel.create({
            product: a.productId,
            customer,
            quantity: a.quantity,
            price: a.price,
          });
        }
      }
      for (let elm of arr) {
        await this.orderModel.findOneAndDelete({ elm, status: 0 });
      }
      return arr;
    } else {
      throw new NotFoundException('user not found');
    }
  }
}

// https://stripe.com/docs/payments/accept-a-payment#web-collect-card-details
