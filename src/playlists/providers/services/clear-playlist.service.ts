import { Inject, Injectable } from '@nestjs/common';
import { ITracksRepository } from '@/tracks/providers/tracks.repository';
import { FindPlaylistById } from './find-playlist-by-id.service';
import { PlayList } from '@prisma/client';

@Injectable()
export class ClearPlaylistService {
  constructor(
    @Inject('ITracksRepository')
    private readonly tracksRepository: ITracksRepository,
    private readonly findPlaylistById: FindPlaylistById,
  ) {}

  async execute(playlistId: number, userId: number): Promise<void> {
    const playlist: PlayList = await this.findPlaylistById.execute(playlistId);
    if (playlist.userId !== userId)
      throw new Error('Not allowed. You are not the host of this playlist');
    await this.tracksRepository.deleteMany({ playlistId });
  }
}
