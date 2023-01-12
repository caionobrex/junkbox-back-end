import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoginService {
  constructor(private readonly jwtService: JwtService) {}

  async execute(user: User) {
    return this.jwtService.sign({
      id: user.id,
      username: user.name,
      avatar: user.avatar,
    });
  }
}
