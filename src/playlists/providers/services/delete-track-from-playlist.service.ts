import { Inject, Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { IPlayListsRepository } from '../playlists.repository';

@Injectable()
export class DeleteTrackFromPlaylistService {
  constructor(
    @Inject('IPlayListsRepository')
    private readonly playlistsRepository: IPlayListsRepository,
  ) {}

  async execute(playlistId: number, trackId: number): Promise<Track> {
    const track: Track = await this.playlistsRepository.deleteTrack(trackId);
    await this.playlistsRepository.updateOne(playlistId, {
      tracksCount: { decrement: 1 },
    });
    return track;
  }
}
