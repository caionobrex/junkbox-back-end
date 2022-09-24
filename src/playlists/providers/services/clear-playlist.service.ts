import { Injectable } from '@nestjs/common';
import { SongsRepository } from '@/songs/providers/songs.repository';
import { FindPlaylistById } from './find-playlist-by-id';
import { PlayList } from '@prisma/client';

@Injectable()
export class ClearPlaylistService {
  constructor(
    private readonly songRepository: SongsRepository,
    private readonly findPlaylistById: FindPlaylistById,
  ) {}

  async execute(playlistId: number, userId: number): Promise<void> {
    const playlist: PlayList = await this.findPlaylistById.execute(playlistId);
    if (playlist.userId !== userId)
      throw new Error('Not allowed. You are not the host of this playlist');
    await this.songRepository.deleteMany({ playlistId });
  }
}
