import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PlayList, PlayListType } from '@prisma/client';
import { Request as ExpressRequest } from 'express';
import { CreatePlayListDto } from '../dtos/create-playlist.dto';
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

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOne(
    @Request()
    req: ExpressRequest & { user: { userId: number; username: string } },
    @Body() createPlaylistDto: CreatePlayListDto,
  ): Promise<PlayList> {
    return await this.createNewPlaylist.execute({
      type: PlayListType.CASUAL,
      name: createPlaylistDto.name,
      externalId: 'DSAJK32918',
      maxLength: createPlaylistDto.maxLength,
      user: { connect: { id: req.user.userId } },
      description: createPlaylistDto.description,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('')
  async findAll(@Request() req): Promise<PlayList[]> {
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

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteById(
    @Param('id', new ParseIntPipe()) id: number,
    @Request() req: ExpressRequest & { user: { userId: number } },
  ): Promise<PlayList> {
    return await this.deletePlaylistById.execute(id, req.user.userId);
  }
}
