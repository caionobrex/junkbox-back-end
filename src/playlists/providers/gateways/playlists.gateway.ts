/* eslint-disable @typescript-eslint/no-var-requires */
import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { IPlayListsRepository } from '../playlists.repository';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER, Inject, UseGuards } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PlayList, Track } from '@prisma/client';
import { AddTrackToPlaylistService } from '../services/add-track-to-playlist.service';
import { UpVoteTrackService } from '@/tracks/providers/services/up-vote-track.service';
import { HttpService } from '@nestjs/axios';
import { DeleteTrackFromPlaylistService } from '../services/delete-track-from-playlist.service';
import { TracksRepository } from '@/tracks/providers/tracks.repository';
import { WsJwtGuard } from '@/auth/guards/ws-jwt-auth.guard';
const dayjs = require('dayjs');
const duration = require('dayjs/plugin/duration');

dayjs.extend(duration);

@WebSocketGateway({ cors: true })
export class PlaylistsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    @Inject('IPlayListsRepository')
    private readonly playListsRepository: IPlayListsRepository,
    @Inject('ITracksRepository')
    private readonly tracksRepository: TracksRepository,
    private readonly addTrackToPlaylist: AddTrackToPlaylistService,
    private readonly upVoteTrack: UpVoteTrackService,
    private readonly deleteTrackFromPlaylist: DeleteTrackFromPlaylistService,
    private readonly jwtService: JwtService,
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly chacheManager: Cache,
  ) {}

  @SubscribeMessage('joinPlaylist')
  @UseGuards(WsJwtGuard)
  async handleJoinPlaylist(
    @ConnectedSocket() client: Socket,
    @MessageBody('playlistId') playlistId: number,
  ): Promise<void> {
    this.jwtService.verifyAsync(client.handshake.auth.token);
    const playlist: PlayList = await this.playListsRepository.findById(
      +playlistId,
    );
    client.join(playlist.name);
    client.emit('joinPlaylist', playlist.name);
  }

  @SubscribeMessage('leavePlaylist')
  handleLeavePlaylist(
    @ConnectedSocket() client: Socket,
    @MessageBody('room') room: string,
  ) {
    client.leave(room);
  }

  @SubscribeMessage('addTrack')
  @UseGuards(WsJwtGuard)
  async handleAddTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody('playlistId') playlistId: number,
    @MessageBody('externalId') externalId: string,
  ): Promise<void> {
    const payload = await this.jwtService.verifyAsync(
      client.handshake.auth.token,
    );
    const { data } = await this.httpService.axiosRef.get(
      `${process.env.GOOGLE_BASEURL}/youtube/v3/videos?part=snippet,contentDetails&id=${externalId}&key=${process.env.GOOGLE_API_KEY}`,
    );
    // TODO - get song transcription and check if song contains some word that is blacklisted
    const playlist: PlayList = await this.playListsRepository.findById(
      +playlistId,
    );
    try {
      const track: Track = await this.addTrackToPlaylist.execute(
        +playlistId,
        {
          externalId: externalId,
          name: data.items[0].snippet.title,
          image: data.items[0].snippet.thumbnails.medium.url,
          duration: dayjs
            .duration(data.items[0].contentDetails.duration)
            .asSeconds(),
        },
        payload.id,
      );
      this.server.to(playlist.name).emit('addTrack', track);
    } catch (err) {
      client.emit('addTrackError', {
        error: 'Essa playlist já contem essa música.',
      });
    }
  }

  @SubscribeMessage('deleteTrack')
  @UseGuards(WsJwtGuard)
  async handleRemoveTrack(
    @MessageBody('playlistId') playlistId: number,
    @MessageBody('trackId') trackId: number,
  ): Promise<void> {
    const playlist: PlayList = await this.playListsRepository.findById(
      playlistId,
    );
    await this.deleteTrackFromPlaylist.execute(playlistId, trackId);
    this.server.to(playlist.name).emit('deleteTrack', playlistId, trackId);
  }

  @SubscribeMessage('upVoteTrack')
  @UseGuards(WsJwtGuard)
  async handleUpVoteTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody('playlistId') playlistId: number,
    @MessageBody('trackId') trackId: number,
  ): Promise<void> {
    const payload = await this.jwtService.verifyAsync(
      client.handshake.auth.token,
    );
    const playlist: PlayList = await this.playListsRepository.findById(
      +playlistId,
    );
    try {
      const newUpVoteCount = await this.upVoteTrack.execute(
        +trackId,
        +payload.id,
      );
      this.server
        .to(playlist.name)
        .emit('upVoteTrack', trackId, newUpVoteCount);
    } catch (err) {
      client.emit('upVoteTrackError', {
        error: 'Voce não pode dar upvote duas vezes na mesma música.',
      });
    }
  }

  @SubscribeMessage('playTrack')
  @UseGuards(WsJwtGuard)
  async playTrackHandler(
    @MessageBody('trackId') trackId: number,
    trackPosition: number,
  ) {
    const track: Track = await this.tracksRepository.findById(trackId);
    const playlist: PlayList = await this.playListsRepository.findById(
      track.playlistId,
    );
    this.server.to(playlist.name).emit('playTrack', track, trackPosition);
  }
}
