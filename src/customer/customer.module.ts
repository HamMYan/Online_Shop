import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { CustomerSchema } from './entities/customer.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from 'src/card/entities/card.entity';
import { ProductSchema } from 'src/product/entities/product.entity';
import { OrderSchema } from 'src/order/entities/order.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Customer', schema: CustomerSchema },
    { name: 'Card', schema: CardSchema },
    { name: 'Product', schema: ProductSchema },
  ])],
  controllers: [CustomerController],
  providers: [CustomerService],
  exports: [CustomerModule]
})
export class CustomerModule { }
