import { Module } from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ManagerController } from './manager.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ManagerSchema } from './entities/manager.entity';

@Module({
  imports:[MongooseModule.forFeature([{name:'Manager',schema:ManagerSchema}])],
  controllers: [ManagerController],
  providers: [ManagerService],
})
export class ManagerModule {}
