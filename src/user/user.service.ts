import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import {
  ResetPassword,
  UpdateUserDto,
  UpdtaeUserPassword,
} from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { EmailService } from 'src/email/email.service';
import { Manager } from 'src/manager/entities/manager.entity';
import { Customer } from 'src/customer/entities/customer.entity';
import { Role } from './entities/role-enum';
import { Product } from 'src/product/entities/product.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Order } from 'src/order/entities/order.entity';
import * as fs from 'fs';
import { join } from 'path';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Manager') private managerModel: Model<Manager>,
    @InjectModel('Customer') private customerModel: Model<Customer>,
    @InjectModel('Product') private productModel: Model<Product>,
    @InjectModel('Feedback') private feedbackModel: Model<Feedback>,
    @InjectModel('Order') private orderModel: Model<Order>,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const {
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      description,
      role,
    } = createUserDto;
    const userInUsername = await this.userModel.findOne({ username });
    const userInPhonenumber = await this.userModel.findOne({ phoneNumber });
    const hashedPassword = await bcrypt.hashSync(password, 10);
    const code = uuid();

    if (userInUsername)
      throw new ForbiddenException(`Username - ${username} has arleady`);
    if (userInPhonenumber)
      throw new ForbiddenException(`PhoneNumber - ${phoneNumber} has arleady`);

    const user = await this.userModel.create({
      firstName,
      lastName,
      username,
      password: hashedPassword,
      phoneNumber,
      description,
      role,
      code,
    });
    if (role.includes(Role.MANAGER)) {
      const manager = await this.managerModel.create({
        user: user,
        _id: user._id,
        description,
      });
      await this.userModel.findByIdAndUpdate(user.id, { manager });
    }
    if (role.includes(Role.CUSTOMER)) {
      const customer = await this.customerModel.create({
        user: user,
        _id: user._id,
      });
      await this.userModel.findByIdAndUpdate(user.id, { customer });
    }

    const message = `Please click   
     <a href='http://localhost:3000/auth/verify?email=${username}&emailToken=${code}'>here</a> for verify`;

    this.emailService.sendMail(
      'hammkrtchyan7@gmail.com',
      `Hello dear ${username} welcome our site`,
      message,
    );

    return {
      firstName,
      lastName,
      username,
      password,
      phoneNumber,
      description,
    };
  }

  async isVerify(email: string, emailToken: string) {
    const user = await this.userModel.findOne({ username: email });
    if (!user) throw new NotFoundException('User not found');
    await this.userModel.findByIdAndUpdate(user.id, {
      code: null,
      isVerify: true,
    });
    return { message: 'You have passed the verification' };
  }

  async findAll() {
    const users = await this.userModel.find();
    if (!users) return { message: 'There are no users' };
    return users;
  }

  async findOne(id: string) {
    const users = await this.userModel.findById(id);
    if (!users) return { message: 'USer nto found' };
    return users;
  }

  async findOneUsername(username: string) {
    return await this.userModel.findOne({ username });
  }

  async updateData(req, updateUserDto: UpdateUserDto) {
    const user = await this.userModel.findById(req.user.id);
    if (!user) throw new BadRequestException('User not found');
    if (user._id.toString() !== req.user.id)
      throw new BadRequestException(
        'You cant update this account data because this not your account',
      );

    const { firstName, lastName, age, phoneNumber } = updateUserDto;
    const userInPhonenumber = await this.userModel.findOne({ phoneNumber });
    if (userInPhonenumber)
      throw new BadRequestException(`${phoneNumber} - has arleady`);

    await this.userModel.findByIdAndUpdate(req.user.id, {
      firstName,
      lastName,
      age,
      phoneNumber,
    });

    return { message: 'Your data updated' };
  }

  async updateImage(req, file) {
    const user = await this.userModel.findById(req.user.id);
    if (!user) throw new BadRequestException('User not found');

    const userImg = user.image;
    if (userImg) {
      await fs.unlink(
        join(__dirname, '..', '..', 'uploads', userImg),
        (err) => {
          if (err) err;
          console.log('Succes');
        },
      );
    }

    await this.userModel.findByIdAndUpdate(user.id, {
      image: file.filename,
    });

    return { message: 'Image Updated' };
  }

  async updatePassword(req, updateUserPassword: UpdtaeUserPassword) {
    const user = await this.userModel.findById(req.user.id);
    if (!user) {
      throw new BadRequestException(
        "You can't update this account password because this is not your account",
      );
    }

    const { oldPassword, confirmPassword } = updateUserPassword;

    if (!bcrypt.compareSync(oldPassword, user.password)) {
      throw new BadRequestException('Old password is incorrect');
    }

    const hashedPassword = bcrypt.hashSync(
      confirmPassword,
      bcrypt.hashSync(confirmPassword, 10),
    );
    await this.userModel.findByIdAndUpdate(user.id, {
      password: hashedPassword,
    });

    return { message: 'Password updated' };
  }

  async forgotPassword(email: string) {
    const user = await this.userModel.findOne({ username: email });
    if (!user) throw new BadRequestException('User not found');

    const code = Math.floor(Math.random() * 90000 + 10000);
    await this.userModel.findByIdAndUpdate(user.id, { code });

    const message = `Verification code <h1>${code}</h1>`;
    this.emailService.sendMail(
      'hammkrtchyan7@gmail.com',
      'Enter this code to verify your identity',
      message,
    );

    return { message: 'We send your mail virification code' };
  }

  async resetPassword(resetPassword: ResetPassword) {
    const { code, confirmPassword } = resetPassword;
    const user = await this.userModel.findOne({ code });
    if (!user) throw new BadRequestException('Code is incorrect');

    const password = await bcrypt.hashSync(confirmPassword, 10);

    await this.userModel.findByIdAndUpdate(user.id, { password, code: null });
    return { message: 'Password updated' };
  }

  async deleteAccount(req) {
    const user = await this.userModel.findById(req.user.id);
    if (!user) throw new BadRequestException('User not found');
    if (user._id.toString() !== req.user.id)
      throw new BadRequestException(
        'You cant delete this account because this not your account',
      );

    await this.userModel.findByIdAndDelete(req.user.id);

    const manager = await this.managerModel.findOne({ user: req.user.id });
    const customer = await this.customerModel.findOne({ user: req.user.id });
    const product = await this.productModel.findOne({ manager: req.user.id });
    const feedback = await this.feedbackModel.findOne({
      customer: req.user.id,
    });
    const order = await this.feedbackModel.findOne({ customer: req.user.id });

    if (manager) await this.managerModel.findByIdAndDelete(manager.id);
    if (customer) await this.customerModel.findByIdAndDelete(customer.id);
    if (product) await this.customerModel.findByIdAndDelete(product.id);
    if (feedback) await this.customerModel.findByIdAndDelete(feedback.id);
    if (order) await this.customerModel.findByIdAndDelete(order.id);

    return { message: 'User is deleted' };
  }
}
