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
  Query,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload/config';
import { Request, Response } from 'express';
import { Role } from 'src/user/entities/role-enum';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RoleGuard } from 'src/auth/roles.guard';
import { UpdateProductData, UpdateProductStatus, UpdateSubCategory } from './dto/update-product.dto';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

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
      const data = await this.productService.create(createProductDto, files, req);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }




  @Get()
  async findAll(@Res() res: Response) {
    try {
      const data = await this.productService.findAll()
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('myAllProducts')
  async findMyAllProducts(@Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.productService.findMyAllProducts(req)
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('myRejectedProds')
  async myRejectedProds(@Req() req: Request, @Res() res: Response) {
    try {
      const data = await this.productService.myRejectedProds(req)
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }



  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.productService.findOne(id);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }




  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updateData/:id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductData,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const data = await this.productService.updateData(id, updateProductDto, req);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('image', null, multerOptions))
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary'
          }
        },
      },
    },
  })
  @Patch('addImage/:id')
  async addImage(
    @Param('id') id: string,
    @UploadedFiles() files,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const data = await this.productService.addImage(id, files, req);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updateStatus/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateProductStatus: UpdateProductStatus,
    @Res() res: Response
  ) {
    try {
      const data = await this.productService.updateStatus(id, updateProductStatus)
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updtaSubCategory/:id')
  async updateSubCategory(
    @Body() updateSubCategory: UpdateSubCategory,
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const data = await this.productService.updateSubCategory(id, updateSubCategory, req)
      return res.status(HttpStatus.OK).json(data)
    }
    catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message })
    }
  }



  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete('remaoveImage/:id')
  async removeImage(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response,
    @Query('imageName') imageName: string
  ) {
    try {
      const data = await this.productService.deleteImage(id, imageName, req);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.BAD_REQUEST).json({ message: err.message });
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.MANAGER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(':id')
  async remove(
    @Param('id') id: string,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const data = await this.productService.remove(id, req);
      return res.status(HttpStatus.OK).json(data);
    } catch (err) {
      return res.status(HttpStatus.NOT_FOUND).json({ message: err.message });
    }
  }
}