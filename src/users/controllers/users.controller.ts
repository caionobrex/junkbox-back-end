import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { FindUserByIdService } from '../providers/services/find-user-by-id.service';
import { User } from '@prisma/client';
import { FindAllUsersService } from '../providers/services/find-all-user.service';

@Controller('users')
export class UsersController {
  constructor(
    private readonly findUserById: FindUserByIdService,
    private readonly findAllUser: FindAllUsersService,
  ) {}

  @Get()
  async findAll(): Promise<User[]> {
    return this.findAllUser.execute();
  }

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
