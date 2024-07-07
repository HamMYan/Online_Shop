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
    const image = file.filename
    const { name } = createCategoryDto
    const cat = await this.categoryModel.findOne({ name })
    if (cat) throw new ForbiddenException(`${name} - has arleady`)

    const category = await this.categoryModel.create({
      name,
      image
    })
    return category
  }

  async findAll() {
    const categories = await this.categoryModel.find().populate('subCategory')
    if (!categories) throw new NotFoundException('Categories not found')
    return categories
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id)
    if (!category) throw new NotFoundException('Category not found')
    return category
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto, file) {
    const { name } = updateCategoryDto

    const category = await this.categoryModel.findById(id)
    const cat = await this.categoryModel.findOne({ name })

    if (!category) throw new NotFoundException('Category not found')
    if (cat) throw new ForbiddenException(`${name} - has arleady`)

    await this.categoryModel.findByIdAndUpdate(id, {
      name,
      image: file.filename
    })
    return { message: 'Category updated' }
  }

  async remove(id: string) {
    const category = await this.categoryModel.findById(id)
    if (!category) throw new NotFoundException('Category not found')
    await this.categoryModel.findByIdAndDelete(id)
    return { message: 'Category deleted' }
  }
}
