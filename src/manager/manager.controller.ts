import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
  HttpStatus,
  Req,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/entities/role-enum';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Request, Response } from 'express';
import { UpdateManagerData } from './dto/update-manager.dto';

@ApiTags('Manager')
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  findAll() {
    return this.managerService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.managerService.findOne(id);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updateManagerData')
  async update(
    @Body() updateManagerData: UpdateManagerData,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.managerService.updateData(
        req.user.id,
        updateManagerData,
      );
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }
}
