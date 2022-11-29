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
    if (playlist.isPrivate && !playlist.password)
      throw Error('If playlist is private, password is required!');
    if (await this.playlistsRepository.findByName(playlist.name))
      throw Error('This playlist name already exists!');
    return await this.playlistsRepository.insertOne(playlist);
  }
}
