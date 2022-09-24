import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Song } from '@prisma/client';

@Injectable()
export class SongsRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOne(song: Prisma.SongCreateInput): Promise<Song> {
    return this.prisma.song.create({ data: song });
  }

  async deleteMany(where: Prisma.SongWhereInput): Promise<void> {
    await this.prisma.song.deleteMany({ where });
  }

  deleteOne(songId: number): Promise<Song> {
    return this.prisma.song.delete({ where: { id: songId } });
  }
}
