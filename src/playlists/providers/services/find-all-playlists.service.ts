import { Injectable } from '@nestjs/common';
import { PlayList } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';

@Injectable()
export class FindAllPlaylistsService {
  constructor(private readonly playlistsRepository: PlayListsRepository) {}

  execute(): Promise<PlayList[]> {
    return this.playlistsRepository.findAll();
  }
}
