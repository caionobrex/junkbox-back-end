import { CreateUserService } from '@/users/providers/services/create-user.service';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class RegisterService {
  constructor(private readonly createUserService: CreateUserService) {}

  async execute(
    email: string,
    username: string,
    password: string,
    ip?: string,
  ) {
    try {
      await this.createUserService.execute({
        email,
        name: username,
        password: await bcrypt.hash(password, 8),
        ip,
      });
    } catch (err) {
      throw err;
    }
  }
}
