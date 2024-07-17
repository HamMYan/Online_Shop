import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
  Query,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { Login } from 'src/user/dto/update-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) { }

  @ApiResponse({description:'Register by user data'})
  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    try {
      const data = await this.userService.create(createUserDto);
      return res.status(HttpStatus.CREATED).json(data);
    } catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }


  @ApiResponse({description:'Login by user email and password'})
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() log: Login){
    return this.authService.login(req.user)
  }

  @Get('/verify')
  async isVerify(
    @Query('email') email: string,
    @Query('emailToken') emailToken: string,
    @Res() res: Response) {
    try {
      const data = await this.userService.isVerify(email, emailToken)
      return res.status(HttpStatus.OK).json(data)
    }
    catch (err) {
      return res.status(HttpStatus.OK).json({ message: err.message });
    }
  }
}