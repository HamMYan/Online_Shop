import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from 'src/customer/entities/customer.entity';
import { Product } from 'src/product/entities/product.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { Card } from './entities/card.entity';

@Injectable()
export class CardService {
  constructor(
    @InjectModel('Card') private cardModel: Model<Card>,
    @InjectModel('Customer') private customerModel: Model<Customer>,
    @InjectModel('Product') private productModel: Model<Product>,
  ) {}

  async create(id, product, createCardDto: CreateCardDto) {
    const customer = await this.customerModel.findById(id);
    if (!customer) throw new BadRequestException('Customer not found');

    const prod = await this.productModel.findById(product);
    if (!prod) throw new BadRequestException('Product not found');

    const card = await this.cardModel.findOne({
      customer: id,
      product: product,
    });
    if (!card) {
      const { quantity } = createCardDto;

      const newCard = await this.cardModel.create({
        customer: customer.id,
        product,
        quantity,
      });

      await this.customerModel.findByIdAndUpdate(customer, {
        $push: { card: newCard },
      });

      return newCard;
    }

    await this.cardModel.findByIdAndUpdate(card, {
      quantity: card.quantity + 1,
    });

    return card;
  }

  async findAll(id) {
    const cards = await this.cardModel.find({ customer: id });
    if (!cards) return { message: 'There are not cards' };
    return cards;
  }

  findOne(id: number) {
    return `This action returns a #${id} card`;
  }

  update(id: number, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: number) {
    return `This action removes a #${id} card`;
  }
}
