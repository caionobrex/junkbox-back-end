import { Injectable } from '@nestjs/common';
import { PlayList, Prisma, Track } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayListsRepository {
  constructor(private readonly prisma: PrismaService) {}

  insertOne(playlist: Prisma.PlayListCreateInput): Promise<PlayList> {
    return this.prisma.playList.create({ data: playlist });
  }

  findAll(): Promise<PlayList[]> {
    return this.prisma.playList.findMany({ include: { user: true } });
  }

  findById(id: number): Promise<PlayList> {
    return this.prisma.playList.findUnique({
      where: { id },
      include: { tracks: { include: { addedBy: true, upVotes: true } } },
    });
  }

  findAllTracks(playlistId: number): Promise<Track[]> {
    return this.prisma.track.findMany({
      where: { playlistId },
      include: { addedBy: true, upVotes: true },
    });
  }

  updateOne(
    id: number,
    playList: Prisma.PlayListUpdateInput,
  ): Promise<PlayList> {
    return this.prisma.playList.update({ where: { id }, data: playList });
  }

  deleteOne(id: number): Promise<PlayList> {
    return this.prisma.playList.delete({ where: { id } });
  }
}
