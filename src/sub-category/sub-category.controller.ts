import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { SubCategoryService } from './sub-category.service';
import { CreateSubCategoryDto } from './dto/create-sub-category.dto';
import { UpdateSubCategoryDto } from './dto/update-sub-category.dto';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Role } from 'src/user/entities/role-enum';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';

@ApiTags('Sub-Category')
@Controller('sub-category')
export class SubCategoryController {
  constructor(private readonly subCategoryService: SubCategoryService) { }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiConsumes('multipart/form-data')
  @Post()
  async create(@Body() createSubCategoryDto: CreateSubCategoryDto, @Res() res: Response) {
    try {
      const data = await this.subCategoryService.create(createSubCategoryDto);
      return res.status(HttpStatus.CREATED).json(data)
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.subCategoryService.findAll()
      return res.status(HttpStatus.OK).json(data)
    }
    catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.subCategoryService.findOne(id)
      return res.status(HttpStatus.OK).json(data)
    }
    catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiConsumes('multipart/form-data')
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateSubCategoryDto: UpdateSubCategoryDto, @Res() res: Response) {
    try {
      const data = await this.subCategoryService.update(id, updateSubCategoryDto)
      return res.status(HttpStatus.OK).json(data)
    }
    catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message })
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiConsumes('multipart/form-data')
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.subCategoryService.remove(id);
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message })
    }
  }
}
