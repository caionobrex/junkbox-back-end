import { TracksRepository } from '@/tracks/providers/tracks.repository';
import { Injectable } from '@nestjs/common';
import { PlayList, Prisma, Track } from '@prisma/client';
import { FindPlaylistById } from './find-playlist-by-id';

@Injectable()
export class AddTrackToPlaylistService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    private readonly findPlaylistById: FindPlaylistById,
  ) {}

  async execute(
    playlistId: number,
    song: Prisma.TrackCreateInput,
    userId: number,
  ): Promise<Track> {
    const playlist: PlayList = await this.findPlaylistById.execute(playlistId);
    if (playlist.tracksCount > playlist.maxLength)
      throw new Error('The playlist has reached the maximum limit.');
    return this.tracksRepository.createOne({
      ...song,
      addedBy: { connect: { id: userId } },
      playlist: { connect: { id: playlistId } },
    });
  }
}
