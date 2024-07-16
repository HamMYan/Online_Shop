import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Res, HttpStatus } from '@nestjs/common';
import { FeedbackService } from './feedback.service';
import { CreateFeedbackDto } from './dto/create-feedback.dto';
import { UpdateFeedbackDto } from './dto/update-feedback.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/user/entities/role-enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Request, Response } from 'express';

@ApiTags('Feedback')
@Controller('feedback')
export class FeedbackController {
  constructor(private readonly feedbackService: FeedbackService) { }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post(':product')
  async create(
    @Body() createFeedbackDto: CreateFeedbackDto,
    @Param('product') product: string,
    @Req() req,
    @Res() res: Response
  ) {
    try {
      const data = await this.feedbackService.create(createFeedbackDto, product, req);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string, 
    @Body() updateFeedbackDto: UpdateFeedbackDto,
    @Req() req,
    @Res() res: Response
  ) {
    try {
      const data = await this.feedbackService.update(id, req.user.id, updateFeedbackDto);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req,
    @Res() res: Response
  ) {
    try {
      const data = await this.feedbackService.remove(id, req);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }
}
