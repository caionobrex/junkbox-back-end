import { Inject, Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { IPlayListsRepository } from '../playlists.repository';

@Injectable()
export class FindAllPlaylistTracksService {
  constructor(
    @Inject('IPlayListsRepository')
    private readonly playlistsRepository: IPlayListsRepository,
  ) {}

  async execute(playlistId: number): Promise<Track[]> {
    return this.playlistsRepository.findAllTracks(playlistId);
  }
}
