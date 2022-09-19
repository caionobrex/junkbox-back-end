import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import services from './providers/services';
import { UsersRepository } from './providers/users.repository';

@Module({
  providers: [...services, PrismaService, UsersRepository],
  exports: [...services],
})
export class UsersModule {}
