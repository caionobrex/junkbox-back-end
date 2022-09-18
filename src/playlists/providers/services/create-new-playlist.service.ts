import { Injectable } from '@nestjs/common';
import { PlayList, Prisma } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';

@Injectable()
export class CreateNewPlaylistService {
  constructor(private readonly playlistsRepository: PlayListsRepository) {}

  async execute(playlist: Prisma.PlayListCreateInput): Promise<PlayList> {
    return await this.playlistsRepository.insertOne(playlist);
  }
}
