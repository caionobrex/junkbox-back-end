import { Injectable } from '@nestjs/common';
import { PlayList, Prisma, Track } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

export interface IPlayListsRepository {
  insertOne(playlist: Prisma.PlayListCreateInput): Promise<PlayList>;

  findAll(): Promise<PlayList[]>;

  findById(id: number): Promise<PlayList>;

  findAllTracks(playlistId: number): Promise<Track[]>;

  findTrackByExternalId(
    externalId: string,
    playlistId: number,
  ): Promise<Track | null>;

  updateOne(
    id: number,
    playList: Prisma.PlayListUpdateInput,
  ): Promise<PlayList>;

  deleteOne(id: number): Promise<PlayList>;

  deleteTrack(id: number): Promise<Track>;
}

@Injectable()
export class PlayListsRepository implements IPlayListsRepository {
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
    return this.prisma.playList.findUnique({
      where: { id },
      include: { user: true },
    });
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
