import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer, Payment } from './entities/customer.entity';
import { AddCustomerPayment } from './dto/update-customer.dto';
import { Card } from 'src/card/entities/card.entity';
import { Product } from 'src/product/entities/product.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
    @InjectModel('Card') private cardModel: Model<Card>,
    @InjectModel('Product') private productModel: Model<Product>
  ) { }

  async update(id, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerModel.findById(id);
    if (!customer) throw new BadRequestException('Customer not found');

    const { card } = updateCustomerDto;

    for (let e of card) {
      var cd = await this.cardModel.findById(e)
      if (!cd) throw new BadRequestException('Card not found')
    }

    await this.customerModel.findByIdAndUpdate(customer, {
      card: [cd]
    })

    return customer
  }


  async addPayment(id: string, addCustomerPayment: AddCustomerPayment) {
    const customer = await this.customerModel.findById(id);
    if (!customer) throw new BadRequestException('Customer not found');

    const { name, number, date, cvv } = addCustomerPayment;

    const payment = await this.customerModel.findByIdAndUpdate(id, {
      $push: {
        payment: { name, number, date, cvv },
      },
    });

    return payment
  }

  async addWish(userId, id) {
    const customer = await this.customerModel.findById(userId);
    if (!customer) throw new BadRequestException('Customer not found');

    const product = await this.productModel.findById(id)
    if (!product) throw new BadRequestException('Product not found')

    await this.customerModel.findByIdAndUpdate(customer, {
      $push: {
        wish: product
      }
    })

    return { message: 'Wish added' }
  }

}
