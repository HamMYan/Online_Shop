import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Res,
  HttpStatus,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload/config';
import { Request, Response } from 'express';
import { Role } from 'src/user/entities/role-enum';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        image: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        price: { type: 'number' },
        count: { type: 'number' },
        description: { type: 'string' },
        subCategory: { type: 'string' },
        other: {
          type: 'object',
          properties: {
            size: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  str: { type: 'string' },
                  color: { type: 'string' },
                  count: { type: 'number' },
                },
              },
            },
            color: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  str: { type: 'string' },
                  count: { type: 'number' },
                },
              },
            },
            date: { type: 'string' },
          },
        },
      },
    },
  })
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFiles() files,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const data = await this.productService.create(createProductDto, files,req);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string,@Res() res: Response) {
    try {
      const data = await this.productService.findOne(id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
