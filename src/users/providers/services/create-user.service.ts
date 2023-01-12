import { Inject, Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../users.repository';
import { FindUserByEmailService } from './find-user-by-email.service';
import { FindUserByNameService } from './find-user-by-name.service';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('IUsersRepository')
    private readonly usersRepository: IUsersRepository,
    private readonly findUserByEmail: FindUserByEmailService,
    private readonly findUserByName: FindUserByNameService,
  ) {}

  async execute(user: Prisma.UserCreateInput): Promise<User> {
    if (await this.findUserByEmail.execute(user.email))
      throw new Error('Email already exists.');
    if (await this.findUserByName.execute(user.name))
      throw new Error('Name already exists.');
    return await this.usersRepository.createOne(user);
  }
}
