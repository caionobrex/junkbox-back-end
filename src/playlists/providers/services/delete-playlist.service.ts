import { Injectable } from '@nestjs/common';
import { PlayList } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';

@Injectable()
export class DeletePlaylistByIdService {
  constructor(private readonly playlistsRepository: PlayListsRepository) {}

  execute(id: number): Promise<PlayList> {
    return this.playlistsRepository.deleteOne(id);
  }
}
