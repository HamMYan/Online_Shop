import { Module } from '@nestjs/common';
import { CardService } from './card.service';
import { CardController } from './card.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CardSchema } from './entities/card.entity';
import { CustomerSchema } from 'src/customer/entities/customer.entity';
import { ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Card', schema: CardSchema },
      { name: 'Customer', schema: CustomerSchema },
      { name: 'Product', schema: ProductSchema },
    ]),
  ],
  controllers: [CardController],
  providers: [CardService],
  exports: [CardService]
})
export class CardModule {}
