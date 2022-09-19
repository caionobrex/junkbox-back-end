import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PlayList, PlayListType } from '@prisma/client';
import { CreateNewPlaylistService } from '../providers/services/create-new-playlist.service';
import { DeletePlaylistByIdService } from '../providers/services/delete-playlist.service';
import { FindAllPlaylistsService } from '../providers/services/find-all-playlists.service';
import { FindPlaylistById } from '../providers/services/find-playlist-by-id';

@Controller('playlists')
export class PlayListsController {
  constructor(
    private readonly createNewPlaylist: CreateNewPlaylistService,
    private readonly findAllPlaylists: FindAllPlaylistsService,
    private readonly findPlaylistById: FindPlaylistById,
    private readonly deletePlaylistById: DeletePlaylistByIdService,
  ) {}

  @Post('')
  async createOne(): Promise<PlayList> {
    return await this.createNewPlaylist.execute({
      type: PlayListType.CASUAL,
      name: 'tEST',
      externalId: 'DSAJK32918',
      maxLength: 10,
      songsPerUser: 3,
      description: 'testing endpoint',
    });
  }

  @Get('')
  async findAll(): Promise<PlayList[]> {
    return await this.findAllPlaylists.execute();
  }

  @Get(':id')
  async findById(@Param('id', new ParseIntPipe()) id: number) {
    return await this.findPlaylistById.execute(id);
  }

  @Put(':id')
  updateById(@Param('id', new ParseIntPipe()) id: number) {
    return '';
  }

  @Patch(':id/songs/:id/upvote')
  upvoteSong(): Promise<string> {
    return Promise.resolve('upvote song in a given playlist');
  }

  @Delete(':id/songs/:id')
  deleteSongById(): Promise<string> {
    return Promise.resolve('delete song in a given playlist');
  }

  @Delete(':id/songs')
  deleteAllSongs(): Promise<string> {
    return Promise.resolve('delete all songs in a given playlist');
  }

  @Delete(':id')
  async deleteById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<PlayList> {
    return await this.deletePlaylistById.execute(id);
  }
}
