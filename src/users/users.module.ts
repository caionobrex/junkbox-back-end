import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UsersController } from './controllers/users.controller';
import services from './providers/services';
import { UsersRepository } from './providers/users.repository';

@Module({
  controllers: [UsersController],
  providers: [
    ...services,
    PrismaService,
    { provide: 'IUsersRepository', useClass: UsersRepository },
  ],
  exports: [...services],
})
export class UsersModule {}
