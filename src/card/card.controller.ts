import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/entities/role-enum';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@ApiTags('Card')
@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':product')
  async create(
    @Body() createCardDto: CreateCardDto,
    @Req() req,
    @Res() res: Response,
    @Param('product') product: string,
  ) {
    try {
      const data = await this.cardService.create(
        req.user.id,
        product,
        createCardDto,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll(@Req() req) {
    return await this.cardService.findAll(req.user.id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(+id);
  }
}
