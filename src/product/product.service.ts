import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('SubCategory') private subCategoryModel: Model<SubCategory>,
  ) {}

  async create(createProductDto: CreateProductDto, files, req) {
    const { name, price, count, description, subCategory, other } =
      createProductDto;
    const data = other ? JSON.parse(`${other}`) : {};

    const subCat = await this.subCategoryModel.findOne({ _id: subCategory });
    if (!subCat) throw new BadRequestException('Sub Category not found');
    
    const product = await this.productModel.create({
      name,
      price,
      count,
      description,
      subCategory:subCat,
      images: files.map((elm) => elm.filename),
      manager: req.user.id,
      other: data,
    });

    await this.subCategoryModel.findByIdAndUpdate(subCat,{
      products:[...subCat.products,product]
    })

    return product;
  }

  async findAll() {
    const products = await this.productModel.find().populate('subCategory');
    if (!products) return { message: 'There are no products' };
    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel.findById(id).populate('subCategory')
    if(!product) throw new NotFoundException('Product not found')
    return product
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    //productData - name, price, count, description
    //addImage
    //deleteImage
    //updateStatus - admin
    //updateSubCategory
    //updateOther/:name, obj
    //addFeedback
    //deleteFeedback
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
