import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Res, HttpStatus, Req, UseInterceptors, UploadedFile } from '@nestjs/common';
import { UserService } from './user.service';
import { ResetPassword, UpdateUserDto, UpdtaeUserPassword } from './dto/update-user.dto';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from './entities/role-enum';
import { HasRoles } from 'src/auth/has-roles.decorator';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/upload/config';

@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN, Role.MANAGER, Role.CUSTOMER)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get('profile')
  async getProfile(@Req() req, @Res() res: Response) {
    try {
      const user = await this.userService.getProfile(req.user.id);
      return res.status(HttpStatus.OK).json({ user });
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const data = await this.userService.findOne(id)
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message })
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER, Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updateData')
  async updateData(
    @Body() updateUserDto: UpdateUserDto,
    @Req() req,
    @Res() res: Response,
  ) {
    try {
      const data = await this.userService.updateData(req, updateUserDto);
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message })
    }
  }

  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER, Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updateImage')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: { type: 'string', format: 'binary' }
      } 
    }
  })
  @UseInterceptors(FileInterceptor('image', multerOptions))
  async updateImage(
    @UploadedFile() file,
    @Req() req,
    @Res() res: Response
  ) {
    try {
      const data = await this.userService.updateImage(req, file)
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message })
    }
  }


  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER, Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Patch('updatePassword')
  async updatePassword(
    @Body() updtaeUserPassword: UpdtaeUserPassword,
    @Req() req,
    @Res() res: Response
  ) {
    try {
      const data = await this.userService.updatePassword(req, updtaeUserPassword)
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message })
    }
  }

  @Patch('forgetPassword/:email')
  async forgotPassword(@Param('email') email: string, @Res() res: Response) {
    try {
      const data = await this.userService.forgotPassword(email)
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message })
    }
  }

  @Patch('resetPassword')
  async resetPassword(@Body() resetPassword: ResetPassword, @Res() res: Response) {
    try {
      const data = await this.userService.resetPassword(resetPassword)
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message })
    }
  }

  @Delete('deleteAccount')
  @ApiBearerAuth('JWT-auth')
  @HasRoles(Role.CUSTOMER, Role.MANAGER, Role.ADMIN)
  @UseGuards(JwtAuthGuard, RoleGuard)
  async deleteAccount(@Req() req, @Res() res: Response) {
    try {
      const data = await this.userService.deleteAccount(req)
      return res.status(HttpStatus.OK).json(data)
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message })
    }
  }
}
