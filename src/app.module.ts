import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { ManagerModule } from './manager/manager.module';
import { CustomerModule } from './customer/customer.module';
import { FeedbackModule } from './feedback/feedback.module';
import { CardModule } from './card/card.module';
import { OrderModule } from './order/order.module';
import { EmailModule } from './email/email.module';
import { ConfigModule } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest_project'),
    AuthModule,
    UserModule,
    CategoryModule,
    ProductModule,
    SubCategoryModule,
    ManagerModule,
    CustomerModule,
    FeedbackModule,
    CardModule,
    OrderModule,
    EmailModule,
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),  
    MailerModule.forRoot({
      transport: {
        host: process.env.EMAIL_HOST,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
