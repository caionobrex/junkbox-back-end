import { ITracksRepository } from '@/tracks/providers/tracks.repository';
import { Inject, Injectable } from '@nestjs/common';
import { PlayList, Track } from '@prisma/client';
import { FindPlaylistById } from './find-playlist-by-id.service';

@Injectable()
export class RemoveTrackFromPlaylistService {
  constructor(
    @Inject('ITracksRepository')
    private readonly tracksRepository: ITracksRepository,
    private readonly findPlaylistById: FindPlaylistById,
  ) {}

  async execute(
    trackId: number,
    playlistId: number,
    userId: number,
  ): Promise<Track> {
    const track: Track = await this.tracksRepository.findById(trackId);
    const playlist: PlayList = await this.findPlaylistById.execute(playlistId);
    if (track.userId !== userId && playlist.userId !== userId)
      throw new Error('Not allowed.');
    return this.tracksRepository.deleteOne(trackId);
  }
}
