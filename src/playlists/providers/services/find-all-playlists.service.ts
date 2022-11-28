import { Inject, Injectable } from '@nestjs/common';
import { PlayList } from '@prisma/client';
import { IPlayListsRepository } from '../playlists.repository';

@Injectable()
export class FindAllPlaylistsService {
  constructor(
    @Inject('IPlayListsRepository')
    private readonly playlistsRepository: IPlayListsRepository,
  ) {}

  execute(): Promise<PlayList[]> {
    return this.playlistsRepository.findAll();
  }
}
