import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { UsersRepository } from '../users.repository';

@Injectable()
export class FindAllUsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
