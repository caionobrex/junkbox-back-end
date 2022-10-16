import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';

@Injectable()
export class FindAllPlaylistTracksService {
  constructor(private readonly playlistsRepository: PlayListsRepository) {}

  async execute(playlistId: number): Promise<Track[]> {
    return this.playlistsRepository.findAllTracks(playlistId);
  }
}
