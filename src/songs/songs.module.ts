import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { SongsRepository } from './providers/songs.repository';

@Module({
  providers: [PrismaService, SongsRepository],
  exports: [SongsRepository],
})
export class SongsModule {}
