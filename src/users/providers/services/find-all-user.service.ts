import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class FindAllUsersService {
  constructor(
    @Inject('IUsersRepository')
    private readonly userRepository: IUsersRepository,
  ) {}

  async execute(): Promise<User[]> {
    return this.userRepository.findAll();
  }
}
