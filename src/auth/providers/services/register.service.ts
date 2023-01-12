import { CreateUserService } from '@/users/providers/services/create-user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(
    private readonly createUserService: CreateUserService,
    private readonly jwtService: JwtService,
  ) {}

  async execute(
    email: string,
    username: string,
    password: string,
    ip?: string,
  ) {
    try {
      const user: User = await this.createUserService.execute({
        email,
        name: username,
        password: await bcrypt.hash(password, 8),
        ip,
      });
      return this.jwtService.sign({
        id: user.id,
        username: user.name,
        avatar: user.avatar,
      });
    } catch (err) {
      throw err;
    }
  }
}
