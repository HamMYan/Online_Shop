import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload/config';
import { Response } from 'express';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { Role } from 'src/user/entities/role-enum';

@ApiTags('Category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  // @ApiBearerAuth('JWT-auth')
  // @HasRoles(Role.ADMIN)
  // @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto, @UploadedFile() file, @Res() res: Response) {
    try {
      const data = await this.categoryService.create(createCategoryDto, file)
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
    }
  }

  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.categoryService.findAll()
      return res.status(HttpStatus.OK).json(data)
    }
    catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message })
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.categoryService.findOne(id)
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
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        image: { type: 'string', format: 'binary' },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto, @UploadedFile() file, @Res() res: Response) {
    try {
      const data = await this.categoryService.update(id, updateCategoryDto, file)
      return res.status(HttpStatus.OK).json(data)
    }
    catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(@Param('id') id: string,@Res() res: Response) {
    try {
      const data = await this.categoryService.remove(id)
      return res.status(HttpStatus.OK).json(data)
    }
    catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message })
    }
  }
}
