import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, User } from '@prisma/client';

export interface IUsersRepository {
  createOne(user: Prisma.UserCreateInput): Promise<User>;

  findById(id: number): Promise<User | null>;

  findByEmail(email: string): Promise<User | null>;

  findByName(name: string): Promise<User | null>;

  findAll(): Promise<User[]>;
}

@Injectable()
export class UsersRepository implements IUsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOne(user: Prisma.UserCreateInput): Promise<User> {
    return this.prisma.user.create({ data: user });
  }

  findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  findByName(name: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { name } });
  }

  findAll(): Promise<User[]> {
    return this.prisma.user.findMany();
  }
}
