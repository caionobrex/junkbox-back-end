import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from '../users.repository';

@Injectable()
export class FindUserByEmailService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(email: string): Promise<User> {
    return await this.usersRepository.findByEmail(email);
  }
}
