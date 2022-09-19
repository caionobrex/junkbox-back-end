import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { UsersRepository } from '../users.repository';

@Injectable()
export class FindUserByEmailOrNameService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async execute(emailOrName: string): Promise<User> {
    let user: User = await this.usersRepository.findByEmail(emailOrName);
    if (!user) user = await this.usersRepository.findByName(emailOrName);
    if (!user) throw new NotFoundException();
    return user;
  }
}
