import { SongsRepository } from '@/songs/providers/songs.repository';
import { Injectable } from '@nestjs/common';
import { PlayList, Prisma, Song } from '@prisma/client';
import { FindPlaylistById } from './find-playlist-by-id';

@Injectable()
export class AddSongToPlaylistService {
  constructor(
    private readonly songRepository: SongsRepository,
    private readonly findPlaylistById: FindPlaylistById,
  ) {}

  async execute(
    playlistId: number,
    song: Prisma.SongCreateInput,
    userId: number,
  ): Promise<Song> {
    const playlist: PlayList = await this.findPlaylistById.execute(playlistId);
    if (playlist.songsCount > playlist.maxLength)
      throw new Error('The playlist has reached the maximum limit.');
    return this.songRepository.createOne({
      ...song,
      position: playlist.songsCount,
      user: { connect: { id: userId } },
      playlist: { connect: { id: playlistId } },
    });
  }
}
