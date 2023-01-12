import { Inject, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { NotFoundException } from '@nestjs/common';
import { IUsersRepository } from '../users.repository';

@Injectable()
export class FindUserByIdService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
  ) {}

  async execute(id: number): Promise<User> {
    const user: User = await this.usersRepository.findById(id);
    if (!user) throw new NotFoundException();
    return user;
  }
}
