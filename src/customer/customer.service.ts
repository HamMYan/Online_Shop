import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';
import { AddCustomerPayment } from './dto/update-customer.dto';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel('Customer') private customerModel: Model<Customer>,
  ) {}

  update(id: string, updateCustomerDto: UpdateCustomerDto) {
    
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

}
