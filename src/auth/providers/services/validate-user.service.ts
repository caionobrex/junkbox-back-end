import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { FindUserByEmailOrNameService } from '@/users/providers/services/find-user-by-email-or-name.service';

@Injectable()
export class ValidateUserService {
  constructor(
    private readonly findUserByEmailOrName: FindUserByEmailOrNameService,
  ) {}

  async execute(emailOrName: string, password: string): Promise<User> {
    try {
      const user: User = await this.findUserByEmailOrName.execute(emailOrName);
      if (user && user.password === password) {
        return user;
      }
      return user;
    } catch (err) {
      return null;
    }
  }
}
