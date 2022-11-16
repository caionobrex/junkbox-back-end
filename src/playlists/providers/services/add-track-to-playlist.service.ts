import { TracksRepository } from '@/tracks/providers/tracks.repository';
import { Injectable } from '@nestjs/common';
import { PlayList, Prisma, Track } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';

@Injectable()
export class AddTrackToPlaylistService {
  constructor(
    private readonly tracksRepository: TracksRepository,
    private readonly playlistsRepository: PlayListsRepository,
  ) {}

  async execute(
    playlistId: number,
    track: Prisma.TrackCreateInput,
    userId: number,
  ): Promise<Track> {
    if (await this.playlistHasTrack(track.externalId, playlistId))
      throw new Error('The playlist already contains the track');
    if (await this.hasPlaylistReachedMaxLimit(playlistId))
      throw new Error('The playlist has reached the maximum limit.');
    await this.incrementPlaylistTracksCount(playlistId);
    return this.tracksRepository.createOne({
      ...track,
      addedBy: { connect: { id: userId } },
      playlist: { connect: { id: playlistId } },
    });
  }

  private async playlistHasTrack(
    externalId: string,
    playlistId: number,
  ): Promise<boolean> {
    return !!(await this.playlistsRepository.findTrackByExternalId(
      externalId,
      playlistId,
    ));
  }

  private async hasPlaylistReachedMaxLimit(
    playlistId: number,
  ): Promise<boolean> {
    const playlist: PlayList = await this.playlistsRepository.findById(
      playlistId,
    );
    return playlist.tracksCount > playlist.maxLength;
  }

  private async incrementPlaylistTracksCount(
    playlistId: number,
  ): Promise<void> {
    await this.playlistsRepository.updateOne(playlistId, {
      tracksCount: { increment: 1 },
    });
  }
}
