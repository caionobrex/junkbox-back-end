import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { TracksRepository } from './providers/tracks.repository';

@Module({
  providers: [PrismaService, TracksRepository],
  exports: [TracksRepository],
})
export class SongsModule {}
