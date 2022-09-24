import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { FindUserByIdService } from '../providers/services/find-user-by-id.service';
import { User } from '@prisma/client';

@Controller('users')
export class UsersController {
  constructor(private readonly findUserById: FindUserByIdService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async me(@Request() req: any): Promise<User> {
    const user: User = await this.findUserById.execute(req.user.userId);
    delete user.password;
    delete user.resetPasswordCode;
    delete user.ip;
    return user;
  }
}
