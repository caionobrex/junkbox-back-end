import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from '../users.repository';

@Injectable()
export class FindUserByNameService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(name: string): Promise<User> {
    return await this.usersRepository.findByName(name);
  }
}
