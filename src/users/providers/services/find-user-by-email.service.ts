import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class FindUserByEmailService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(email: string): Promise<User> {
    return await this.usersRepository.findByEmail(email);
  }
}
