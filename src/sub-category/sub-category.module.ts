import { Module } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { SubCategoryController } from './sub-category.controller';
import { SubCategorySchema } from './entities/sub-category.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from 'src/category/entities/category.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'SubCategory', schema: SubCategorySchema }, { name: 'Category', schema: CategorySchema }])],
  controllers: [SubCategoryController],
  providers: [SubCategoryService],
  exports: [SubCategoryService]
})
export class SubCategoryModule { }
