import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class FindUserByNameService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(name: string): Promise<User> {
    return await this.usersRepository.findByName(name);
  }
}
