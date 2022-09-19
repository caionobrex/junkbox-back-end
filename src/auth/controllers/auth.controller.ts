import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginService } from '../providers/services/login.service';
import { RegisterService } from '../providers/services/register.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return {
      accessToken: await this.loginService.execute(req.user),
    };
  }

  @Post('register')
  register(@Body() body) {
    try {
      return this.registerService.execute(
        body.email,
        body.username,
        body.password,
      );
    } catch (err) {
      throw new BadRequestException('Source already exists.');
    }
  }
}
