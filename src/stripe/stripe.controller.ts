import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Header,
  Req,
  Res,
  UseGuards,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { StripeService } from './stripe.service';
import { PaymentDto } from './dto/stripe.dto';
import Stripe from 'stripe';
import { Response } from 'express';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/roles.guard';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/user/entities/role-enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@ApiTags('Stripe*')
@Controller('stripe')
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiResponse({
    description: 'user-ին հնարավորություն է տալիս գնել հավանած product-ները',
  })
  @Post('checkout-session')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        currency: { type: 'string' },
        data: {
          type: 'array',
          items: {
            type: 'number',
          },
        },
      },
    },
  })
  async checkout(
    @Body() paymentData: PaymentDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.stripeService.createCharge(
        paymentData,
        req.user.userId,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiResponse({
    description: 'եթե վճարումը բարեհաջող կատարվում է, ապա աշխատում է success',
  })
  @Get('success')
  async successData(@Req() req, @Res() res: Response) {
    try {
      const data = await this.stripeService.success(req.user.userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }

  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth('JWT-auth')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiResponse({
    description: 'եթե վճարումը չեղարկվում է, ապա աշխատում է cancel',
  })
  @Get('cancel')
  async cancelData(@Req() req, @Res() res: Response) {
    try {
      const data = await this.stripeService.cancel(req.user.userId);
      return res.status(HttpStatus.OK).json(data);
    } catch (e) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: e.message });
    }
  }
}
