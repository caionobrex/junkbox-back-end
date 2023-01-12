import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, Track } from '@prisma/client';

export interface ITracksRepository {
  createOne(track: Prisma.TrackCreateInput): Promise<Track>;

  findById(trackId: number): Promise<Track>;

  updateOne(trackId: number, data: Prisma.TrackUpdateInput): Promise<Track>;

  deleteMany(where: Prisma.TrackWhereInput): Promise<void>;

  deleteOne(trackId: number): Promise<Track>;
}

@Injectable()
export class TracksRepository implements ITracksRepository {
  constructor(private readonly prisma: PrismaService) {}

  createOne(track: Prisma.TrackCreateInput): Promise<Track> {
    return this.prisma.track.create({
      data: track,
      include: { addedBy: true },
    });
  }

  findById(trackId: number): Promise<Track> {
    return this.prisma.track.findUnique({
      where: { id: trackId },
      include: { addedBy: true, playlist: true },
    });
  }

  updateOne(trackId: number, data: Prisma.TrackUpdateInput): Promise<Track> {
    return this.prisma.track.update({
      where: { id: trackId },
      data,
    });
  }

  async deleteMany(where: Prisma.TrackWhereInput): Promise<void> {
    await this.prisma.track.deleteMany({ where });
  }

  deleteOne(trackId: number): Promise<Track> {
    return this.prisma.track.delete({ where: { id: trackId } });
  }
}
