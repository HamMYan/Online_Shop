import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/entities/role-enum';
import { CustomerService } from './customer.service';
import { AddCustomerPayment, UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customer')
@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('addPayment')
  async addPayment(
    @Req() req,
    @Res() res:Response,
    @Body() addCustomerPayment: AddCustomerPayment,
  ) {
    try{
      const data = await this.customerService.addPayment(req.user.id,addCustomerPayment)
      return res.status(HttpStatus.OK).json({data})
    }catch(err){
      return res.status(HttpStatus.OK).json({message:err.message})
    }
  }
}
