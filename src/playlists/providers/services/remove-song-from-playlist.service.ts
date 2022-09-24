import { SongsRepository } from '@/songs/providers/songs.repository';
import { Injectable } from '@nestjs/common';
import { Song } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';
import { FindPlaylistById } from './find-playlist-by-id';

@Injectable()
export class RemoveSongFromPlaylistService {
  constructor(
    private readonly songRepository: SongsRepository,
    private readonly playlistRepository: PlayListsRepository,
    private readonly findPlaylistById: FindPlaylistById,
  ) {}

  // async execute(songId: number, playlistId: number): Promise<Song> {}
}
