import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SubCategory } from 'src/sub-category/entities/sub-category.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { Product } from './entities/product.entity';
import {
  UpdateProductData,
  UpdateProductStatus,
} from './dto/update-product.dto';
import { Manager } from 'src/manager/entities/manager.entity';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('SubCategory') private subCategoryModel: Model<SubCategory>,
    @InjectModel('Manager') private managerModel: Model<Manager>,
  ) { }

  async create(createProductDto: CreateProductDto, files, req) {
    const { name, price, count, description, subCategory, other } =
      createProductDto;
    const data = other ? JSON.parse(`${other}`) : {};

    const manager = await this.managerModel.findById(req.user.id);
    const subCat = await this.subCategoryModel.findOne({ _id: subCategory });

    if (!manager) throw new BadRequestException('Manager not found');
    if (!subCat) throw new BadRequestException('Sub Category not found');

    const product = await this.productModel.create({
      name,
      price,
      count,
      description,
      subCategory: subCat,
      images: files.map((elm) => elm.filename),
      manager: req.user.id,
      other: data,
    });

    await this.managerModel.findByIdAndUpdate(req.user.id, {
      product: [...manager.product, product],
    });

    await this.subCategoryModel.findByIdAndUpdate(subCat, {
      products: [...subCat.products, product],
    });

    return product;
  }

  async findAll() {
    const products = await this.productModel
      .find({ status: 1 })
      .populate('subCategory');
    if (!products.length) return { message: 'There are no products' };
    return products;
  }

  async allPendingProducts() {
    const products = await this.productModel
      .find({ status: 0 })
      .populate('subCategory');
    if (!products.length) return { message: 'There are no products' };
    return products;
  }

  async findMyAllProducts(req) {
    const products = await this.productModel
      .find({ manager: req.user.id })
      .populate('subCategory');
    if (!products.length) return { message: 'There are no products' };
    return products;
  }

  async myRejectedProds(req) {
    const products = await this.productModel.find({
      manager: req.user.id,
      status: -1,
    });
    if (!products) return { message:'There are no products'}
    return products;
  }

  async findOne(id: string) {
    const product = await this.productModel
      .findOne({ id, status: 1 })
      .populate('subCategory');
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async updateData(id: string, updateProductData: UpdateProductData, req) {
    const { name, price, count, description } = updateProductData;
    const product = await this.productModel.findById(id);

    if (!product) throw new BadRequestException('Product not found');
    if (req.user.id !== product.manager.toString())
      throw new BadRequestException(
        'You cannot update this product because you did not install it',
      );

    await this.productModel.findByIdAndUpdate(id, {
      name,
      price,
      count,
      description,
      status: 0,
    });
    return product;
  }

  async updateStatus(id, updateProductStatus: UpdateProductStatus) {
    const product = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('Product not found');
    const { status } = updateProductStatus;
    await this.productModel.findByIdAndUpdate(id, { status });
    return { message: 'Product status changed' };
  }

  async addImage(id: string, files, req) {
    const product = await this.productModel.findById(id);

    if (!product) throw new BadRequestException('Product not found');
    if (req.user.id !== product.manager.toString())
      throw new BadRequestException(
        'You cannot add image in this product because you did not install it',
      );

    await this.productModel.findByIdAndUpdate(id, {
      status: 0,
      images: [...product.images, ...files.map((file) => file.filename)],
    });

    return { message: 'Images Added' };
  }

  async updateSubCategory(id: string, subCategory, req) {
    const product = await this.productModel.findById(id);

    if (!product) throw new BadRequestException('Product not found');
    if (req.user.id !== product.manager.toString())
      throw new BadRequestException(
        'You cannot update sub category in this product because you did not install it',
      );

    const subCat = await this.subCategoryModel.findOne({ _id: subCategory });

    if (!subCat) throw new BadRequestException('Sub Category not found');

    await this.productModel.findByIdAndUpdate(product.id, {
      status: 0,
      subCategory: subCat,
    });

    return { message: 'Sub Category Updated' };
  }

  async updateOther(id, updateOther, name, req) {
    if (name !== 'add' && name !== 'change') return { message: 'There is no such option, you need to add or change it' }
    const product = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('Product not found');
    if (req.user.id !== product.manager._id.toString())
      throw new BadRequestException(
        'You update this product other because you did not install that product',
      );

    if (name == 'add') {
      const size = updateOther.size?.length ? [...product.other.size, ...updateOther.size] : product.other.size;
      const color = updateOther.color?.length ? [...product.other.color, ...updateOther.color] : product.other.color;

      await this.productModel.findByIdAndUpdate(id, {
        'other.size': size,
        'other.color': color,
      });

      return { message: 'Product other is added' };
    }

    else if (name == 'change') {
      const size = updateOther.size?.length ? [...updateOther.size] : product.other.size;
      const color = updateOther.color?.length ? [...updateOther.color] : product.other.color;
      const date = updateOther.date ? updateOther.date : product.other.date;

      await this.productModel.findByIdAndUpdate(id, {
        'other.size': size,
        'other.color': color,
        'other.date': date
      });

      return { message: 'Product other is changed' };
    }
  }

  async deleteImage(id, imageName, req) {
    const product = await this.productModel.findById(id);
    if (!product) throw new BadRequestException('Product not found');
    if (req.user.id !== product.manager._id.toString())
      throw new BadRequestException(
        'You cannot delete this product image because you did not install that product',
      );

    const productImg = product.images.find((img) => img == imageName);
    if (!productImg) throw new BadRequestException('Image not found');

    await fs.unlink(
      join(__dirname, '..', '..', 'uploads', imageName),
      (error) => {
        if (error) error;
        console.log('success');
      },
    );

    await this.productModel.findByIdAndUpdate(product.id, {
      images: [...product.images.filter((img) => img !== imageName)],
    });

    return { message: 'Image Removed' };
  }

  async remove(id: string, req) {
    const product = await this.productModel.findById(id);
    if (req.user.id !== product.manager._id.toString())
      throw new BadRequestException(
        'You cannot delete this product because you did not install that product',
      );

    await this.productModel.findByIdAndDelete(id);

    return { message: 'Product Removed' };
  }
}
