import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UpdateManagerData } from './dto/update-manager.dto';
import { Manager } from './entities/manager.entity';

@Injectable()
export class ManagerService {
  constructor(@InjectModel('Manager') private managerModel: Model<Manager>) { }

  async findAll() {
    const managers = await this.managerModel
      .find()
      .select('description')
      .populate({
        path: 'user',
        select: 'firstName lastName age username image phoneNumber',
      });
    return managers;
  }

  async findOne(id: string) {
    const manager = await this.managerModel
      .findById(id)
      .select('description product')
      .populate({
        path: 'user',
        select: 'firstName lastName age username image phoneNumber',
      });

    if (!manager) throw new NotFoundException('Manager not found');

    return manager;
  }

  async updateData(id: string, updateManagerData: UpdateManagerData) {
    const manager = await this.managerModel.findById(id);
    if (!manager) throw new BadRequestException('Manager not found');
    if (manager.user.toString() !== id)
      throw new BadRequestException(
        'Do you cannot update this account data becouse its not uour account',
      );

    const { description, cardNumber } = updateManagerData;
    await this.managerModel.findByIdAndUpdate(id, { description, cardNumber });

    return { message: 'Manager data updated' };
  }
}
