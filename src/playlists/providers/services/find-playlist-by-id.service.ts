import { Inject, Injectable } from '@nestjs/common';
import { PlayList } from '@prisma/client';
import { IPlayListsRepository } from '../playlists.repository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class FindPlaylistById {
  constructor(
    @Inject('IPlayListsRepository')
    private readonly playlistsRepository: IPlayListsRepository,
  ) {}

  async execute(id: number): Promise<PlayList> {
    const playList: PlayList = await this.playlistsRepository.findById(id);
    if (!playList) throw new NotFoundException();
    return playList;
  }
}
