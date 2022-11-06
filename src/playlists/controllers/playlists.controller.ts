import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Put,
  Request,
  UseGuards,
  CACHE_MANAGER,
} from '@nestjs/common';
import { PlayList } from '@prisma/client';
import { Cache } from 'cache-manager';
import { Request as ExpressRequest } from 'express';
import { CreatePlayListDto } from '../dtos/create-playlist.dto';
import { CreateNewPlaylistService } from '../providers/services/create-new-playlist.service';
import { DeletePlaylistByIdService } from '../providers/services/delete-playlist.service';
import { FindAllPlaylistTracksService } from '../providers/services/find-all-playlist-tracks';
import { FindAllPlaylistsService } from '../providers/services/find-all-playlists.service';
import { FindPlaylistById } from '../providers/services/find-playlist-by-id.service';

@Controller('playlists')
export class PlayListsController {
  constructor(
    private readonly createNewPlaylist: CreateNewPlaylistService,
    private readonly findAllPlaylists: FindAllPlaylistsService,
    private readonly findPlaylistById: FindPlaylistById,
    private readonly deletePlaylistById: DeletePlaylistByIdService,
    private readonly findAllPlaylistTracks: FindAllPlaylistTracksService,
    @Inject(CACHE_MANAGER) private readonly chacheManager: Cache,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post('')
  async createOne(
    @Request()
    req: ExpressRequest & { user: { userId: number; username: string } },
    @Body() createPlaylistDto: CreatePlayListDto,
  ): Promise<PlayList> {
    return await this.createNewPlaylist.execute({
      name: createPlaylistDto.name,
      maxLength: createPlaylistDto.maxLength,
      isPrivate: createPlaylistDto.isPrivate || false,
      password: createPlaylistDto.password,
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

  @Get(':id/tracks')
  async findTracks(@Param('id', new ParseIntPipe()) id: number) {
    return await this.findAllPlaylistTracks.execute(id);
  }

  @Put(':id')
  updateById(@Param('id', new ParseIntPipe()) id: number) {
    return '';
  }

  @Patch(':id/tracks/:id/upvote')
  upvoteTrack(): Promise<string> {
    return Promise.resolve('upvote Track in a given playlist');
  }

  @Delete(':id/tracks/:id')
  deleteTrackById(): Promise<string> {
    return Promise.resolve('delete Track in a given playlist');
  }

  @Delete(':id/tracks')
  deleteAllTracks(): Promise<string> {
    return Promise.resolve('delete all Tracks in a given playlist');
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
