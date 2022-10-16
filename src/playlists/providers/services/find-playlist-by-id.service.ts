import { Injectable } from '@nestjs/common';
import { PlayList } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FindPlaylistById {
  constructor(private readonly playlistsRepository: PlayListsRepository) {}

  async execute(id: number): Promise<PlayList> {
    const playList: PlayList = await this.playlistsRepository.findById(id);
    if (!playList) throw new NotFoundException();
    return playList;
  }
}
