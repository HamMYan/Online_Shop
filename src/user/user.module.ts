import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './entities/user.entity';
import { JoiPipeModule } from 'nestjs-joi';
import { EmailModule } from 'src/email/email.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),JoiPipeModule, EmailModule],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
