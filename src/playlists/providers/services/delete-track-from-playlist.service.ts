import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';

@Injectable()
export class DeleteTrackFromPlaylistService {
  constructor(private readonly playlistsRepository: PlayListsRepository) {}

  async execute(playlistId: number, trackId: number): Promise<Track> {
    const track: Track = await this.playlistsRepository.deleteTrack(trackId);
    await this.playlistsRepository.updateOne(playlistId, {
      tracksCount: { decrement: 1 },
    });
    return track;
  }
}
