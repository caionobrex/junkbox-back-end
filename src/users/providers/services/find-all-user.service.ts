import { Injectable } from '@nestjs/common';
import { UsersRepository } from '../users.repository';

@Injectable()
export class FindAllUsersService {
  constructor(private readonly userRepository: UsersRepository) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
