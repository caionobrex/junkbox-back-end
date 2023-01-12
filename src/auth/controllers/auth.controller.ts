import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  BadRequestException,
  Ip,
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
  async register(@Body() body, @Ip() ip) {
    try {
      return {
        accessToken: await this.registerService.execute(
          body.email,
          body.username,
          body.password,
          ip,
        ),
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }
}
