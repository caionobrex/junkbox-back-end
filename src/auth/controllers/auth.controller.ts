import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { LocalAuthGuard } from '../guards/local-auth.guard';
import { LoginService } from '../providers/services/login.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly loginService: LoginService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req) {
    return this.loginService.execute(req.user);
  }
}
