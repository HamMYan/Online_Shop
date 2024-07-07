import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/product.entity';
import { SubCategorySchema } from 'src/sub-category/entities/sub-category.entity';
import { ManagerSchema } from 'src/manager/entities/manager.entity';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Product', schema: ProductSchema },
    { name: 'SubCategory', schema: SubCategorySchema },
    { name: 'Manager', schema: ManagerSchema }
  ])],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
