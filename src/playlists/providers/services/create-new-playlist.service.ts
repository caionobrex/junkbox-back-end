import { Inject, Injectable } from '@nestjs/common';
import { PlayList, Prisma } from '@prisma/client';
import { IPlayListsRepository } from '../playlists.repository';

@Injectable()
export class CreateNewPlaylistService {
  constructor(
    @Inject('IPlayListsRepository')
    private readonly playlistsRepository: IPlayListsRepository,
  ) {}

  async execute(playlist: Prisma.PlayListCreateInput): Promise<PlayList> {
    // TODO - Check if playlist name already exists
    if (playlist.isPrivate && !playlist.password)
      throw Error('If playlist is private, password is required!');
    return await this.playlistsRepository.insertOne(playlist);
  }
}
