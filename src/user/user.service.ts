import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { v4 as uuid } from 'uuid'
import { EmailService } from 'src/email/email.service';
import { Manager } from 'src/manager/entities/manager.entity';
import { Customer } from 'src/customer/entities/customer.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
    @InjectModel('Manager') private managerModel: Model<Manager>,
    @InjectModel('Customer') private customerModel: Model<Customer>,
    private readonly emailService: EmailService
  ) { }

  async create(createUserDto: CreateUserDto) {
    const { firstName, lastName, username, password, phoneNumber, description, role } = createUserDto;
    const userInUsername = await this.userModel.findOne({ username })
    const userInPhonenumber = await this.userModel.findOne({ phoneNumber })
    const hashedPassword = await bcrypt.hashSync(password, 10)
    const code = uuid()

    if (userInUsername) throw new ForbiddenException(`Username - ${username} has arleady`)
    if (userInPhonenumber) throw new ForbiddenException(`PhoneNumber - ${phoneNumber} has arleady`)

    await this.userModel.create({ firstName, lastName, username, password: hashedPassword, phoneNumber, description, role, code })

    if (role.includes(1)) {
      const user = await this.userModel.findOne({ username })
      await this.managerModel.create({
        user: user.id,
        description
      })
    }
    if (role.includes(2)) {
      const user = await this.userModel.findOne({ username })   
      await this.customerModel.create({
        user: user.id,
      })
    }

    const message = `Please click   
     <a href='http://localhost:3000/auth/verify?email=${username}&emailToken=${code}'>here</a> for verify`

    await this.emailService.sendMail("hammkrtchyan7@gmail.com", `Hello dear ${username} welcome our site`, message)

    return { firstName, lastName, username, password, phoneNumber, description };
  }

  async isVerify(email: string, emailToken: string) {
    const user = await this.userModel.findOne({ username: email })
    if (!user) throw new NotFoundException('User not found')
    await this.userModel.findByIdAndUpdate(user.id, {
      code: null,
      isVerify: true
    })
    return { message: 'You have passed the verification' }
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
