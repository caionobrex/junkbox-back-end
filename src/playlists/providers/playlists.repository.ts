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
    return this.prisma.playList.findMany({
      include: { user: true },
      orderBy: { id: 'desc' },
    });
  }

  findById(id: number): Promise<PlayList> {
    return this.prisma.playList.findUnique({ where: { id } });
  }

  findAllTracks(playlistId: number): Promise<Track[]> {
    return this.prisma.track.findMany({
      where: { playlistId },
      include: { addedBy: true, upVotes: true },
      orderBy: [{ upvoteCount: 'desc' }, { id: 'asc' }],
    });
  }

  findTrackByExternalId(
    externalId: string,
    playlistId: number,
  ): Promise<Track | null> {
    return this.prisma.track.findFirst({ where: { externalId, playlistId } });
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

  deleteTrack(id: number): Promise<Track> {
    return this.prisma.track.delete({ where: { id } });
  }
}
