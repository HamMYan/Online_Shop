import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import {v4 as uuid } from 'uuid'
import { EmailService } from 'src/email/email.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private userModel:Model<User>,
    private readonly emailService: EmailService  
  ){}

  async create(createUserDto: CreateUserDto) {
    const {firstName, lastName,username, password, phoneNumber, description,role} = createUserDto;
    const userInUsername = await this.userModel.findOne({username})
    const userInPhonenumber = await this.userModel.findOne({phoneNumber})
    const hashedPassword = await bcrypt.hashSync(password, 10)
    const code = uuid()

    if(userInUsername) throw new ForbiddenException(`Username - ${username} has arleady`)
    if(userInPhonenumber) throw new ForbiddenException(`PhoneNumber - ${phoneNumber} has arleady`)



    await this.userModel.create({firstName, lastName, username, password:hashedPassword, phoneNumber, description,role,code})
    
    const message = `<h1>Hello dear ${firstName}</h1> please click for verify
     <a href='http://localhost:3000/auth/verify?email=${username}&emailToken=${code}'>Verify</a>`

     await this.emailService.sendMail('hammkrtchyan7@gmail.com','Shnorhakalutyun mer kayqum grancvelu hamar',message)

    return {firstName,lastName,username,password,phoneNumber,description};
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
