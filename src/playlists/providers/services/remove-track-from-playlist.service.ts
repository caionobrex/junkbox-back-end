import { TracksRepository } from '@/tracks/providers/tracks.repository';
import { Injectable } from '@nestjs/common';
import { Track } from '@prisma/client';
import { PlayListsRepository } from '../playlists.repository';
import { FindPlaylistById } from './find-playlist-by-id';

@Injectable()
export class RemoveTrackFromPlaylistService {
  constructor(
    private readonly trackRepository: TracksRepository,
    private readonly playlistRepository: PlayListsRepository,
    private readonly findPlaylistById: FindPlaylistById,
  ) {}

  async execute(songId: number, playlistId: number): Promise<void> {
    // todo
  }
}
