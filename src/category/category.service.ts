import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private categoryModel: Model<Category>) { }

  async create(createCategoryDto: CreateCategoryDto, file) {
    const image = createCategoryDto.image = file.path
    const { name,subCategory } = createCategoryDto

    const cat = await this.categoryModel.findOne({name})
    if(cat) throw new ForbiddenException(`${name} - has arleady`)

    const category = await this.categoryModel.create({
      name,
        image
    })
    return category
  }

  findAll() {
    return `This action returns all category`;
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
