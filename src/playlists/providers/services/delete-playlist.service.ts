import { Inject, Injectable } from '@nestjs/common';
import { PlayList } from '@prisma/client';
import { IPlayListsRepository } from '../playlists.repository';

@Injectable()
export class DeletePlaylistByIdService {
  constructor(
    @Inject('IPlayListsRepository')
    private readonly playlistsRepository: IPlayListsRepository,
  ) {}

  async execute(id: number, userId: number): Promise<PlayList> {
    const playlist: PlayList = await this.playlistsRepository.findById(id);
    if (playlist.userId !== userId)
      throw new Error('Not allowed. You are not the host of this playlist');
    return this.playlistsRepository.deleteOne(id);
  }
}
