import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { JoiPipeModule } from 'nestjs-joi';
import { EmailModule } from 'src/email/email.module';
import { ManagerSchema } from 'src/manager/entities/manager.entity';
import { CustomerSchema } from 'src/customer/entities/customer.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, { name: 'Manager', schema: ManagerSchema },{ name: 'Customer', schema: CustomerSchema }]), JoiPipeModule, EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule { }
