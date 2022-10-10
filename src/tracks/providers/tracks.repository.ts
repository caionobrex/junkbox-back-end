import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Track } from '@prisma/client';

@Injectable()
export class TracksRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOne(track: Prisma.TrackCreateInput): Promise<Track> {
    return this.prisma.track.create({ data: track });
  }

  async deleteMany(where: Prisma.TrackWhereInput): Promise<void> {
    await this.prisma.track.deleteMany({ where });
  }

  deleteOne(trackId: number): Promise<Track> {
    return this.prisma.track.delete({ where: { id: trackId } });
  }
}
