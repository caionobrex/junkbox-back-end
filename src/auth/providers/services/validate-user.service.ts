import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FindUserByEmailOrNameService } from '@/users/providers/services/find-user-by-email-or-name.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ValidateUserService {
  constructor(
    private readonly findUserByEmailOrName: FindUserByEmailOrNameService,
  ) {}

  async execute(emailOrName: string, password: string): Promise<User> {
    try {
      const user: User = await this.findUserByEmailOrName.execute(emailOrName);
      if (user && bcrypt.compareSync(password, user.password)) {
        return user;
      }
    } catch (err) {
      return null;
    }
  }
}
