import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from './entities/sub-category.entity';
import { Category } from 'src/category/entities/category.entity';

@Injectable()
export class SubCategoryService {
  constructor(
    @InjectModel('SubCategory') private subCategoryModel: Model<SubCategory>,
    @InjectModel('Category') private categoryModel: Model<Category>
  ) { }

  async create(createSubCategoryDto: CreateSubCategoryDto) {
    const { name, category } = createSubCategoryDto
    const cat = await this.categoryModel.findById(category)
    const catWithName = await this.subCategoryModel.findOne({ name })
    if (!cat) throw new BadRequestException('Category not found')
    if (catWithName) throw new BadRequestException(`${name} - has arleady`)

    const subCategory = await this.subCategoryModel.create({ name, category: cat })
    await this.categoryModel.findByIdAndUpdate(cat, {
      subCategory: [...cat.subCategory, subCategory]
    })

    return subCategory
  }

  async findAll() {
    const subCategories = await this.subCategoryModel.find().populate('category')
    if (!subCategories) throw new NotFoundException('Sub Categories is not found')
    return subCategories
  }

  async findOne(id: string) {
    const subCategory = await this.subCategoryModel.findById(id).populate('category')
    if (!subCategory) throw new NotFoundException('Sub Category not found')
    return subCategory
  }

  async update(id: string, updateSubCategoryDto: UpdateSubCategoryDto) {
    const subCategory = await this.subCategoryModel.findById(id)
    if (!subCategory) throw new NotFoundException('Sub Category not found')
    const { name } = updateSubCategoryDto
    await this.subCategoryModel.findByIdAndUpdate(id, { name })
    return { message: 'Sub Category Updated' }
  }

  async remove(id: string) {
    const subCategory = await this.subCategoryModel.findById(id)
    if (!subCategory) throw new NotFoundException('Sub Category not found')
    await this.subCategoryModel.findByIdAndDelete(id)
    return { message: 'Sub Category Deleted' }
  }
}
