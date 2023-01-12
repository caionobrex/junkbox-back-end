import { Prisma, User } from '@prisma/client';
import { IUsersRepository } from '../users.repository';
import { FindAllUsersService } from './find-all-user.service';

class UsersRepositoryMock implements IUsersRepository {
  createOne(user: Prisma.UserCreateInput): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findById(id: number): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  findAll(): Promise<User[]> {
    const user: User = {
      name: '',
      avatar: '',
      email: '',
      password: '',
      createdAt: new Date('11/05/2022'),
      ip: '',
      allowDedication: false,
      id: 1,
      updatedAt: new Date('11/05/2022'),
      resetPasswordCode: '',
    };
    return Promise.resolve([user]);
  }
}

describe('FindAllUsersService', () => {
  let findAllUserService: FindAllUsersService;
  beforeEach(async () => {
    findAllUserService = new FindAllUsersService(new UsersRepositoryMock());
  });
  describe('execute', () => {
    it('it should return an array of users', async () => {
      const result = [
        {
          name: '',
          avatar: '',
          email: '',
          password: '',
          createdAt: new Date('11/05/2022'),
          ip: '',
          allowDedication: false,
          id: 1,
          updatedAt: new Date('11/05/2022'),
          resetPasswordCode: '',
        },
      ];
      expect(await findAllUserService.execute()).toStrictEqual(result);
    });
  });
});
