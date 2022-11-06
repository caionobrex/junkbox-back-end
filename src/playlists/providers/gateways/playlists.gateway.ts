import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { PlayListsRepository } from '../playlists.repository';
import { Socket, Server } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Cache } from 'cache-manager';
import { PlayList, Track } from '@prisma/client';
import { AddTrackToPlaylistService } from '../services/add-track-to-playlist.service';
import { RemoveTrackFromPlaylistService } from '../services/remove-track-from-playlist.service';
import { UpVoteTrackService } from '@/tracks/providers/services/up-vote-track.service';
import { FindVideoByIdService } from '@/shared/youtube/providers/services/find-video-by-id';

@WebSocketGateway({ cors: true })
export class PlaylistsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly playListsRepository: PlayListsRepository,
    private readonly AddTrackToPlaylist: AddTrackToPlaylistService,
    private readonly removeTrackFromPlaylist: RemoveTrackFromPlaylistService,
    private readonly findVideoById: FindVideoByIdService,
    private readonly upVoteTrack: UpVoteTrackService,
    private readonly jwtService: JwtService,
    @Inject(CACHE_MANAGER) private readonly chacheManager: Cache,
  ) {}

  @SubscribeMessage('joinPlaylist')
  async handleJoinPlaylist(
    @ConnectedSocket() client: Socket,
    @MessageBody('playlistId') playlistId: number,
  ): Promise<void> {
    this.jwtService.verifyAsync(client.handshake.headers.authorization);
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
  async handleAddTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody('playlistId') playlistId: number,
    @MessageBody('externalId') externalId: string,
  ): Promise<void> {
    const payload = await this.jwtService.verifyAsync(
      client.handshake.headers.authorization,
    );
    // TODO - check if user is authenticated
    // TODO - get song transcription and check if song contains some word that is blacklisted
    const playlist: PlayList = await this.playListsRepository.findById(
      +playlistId,
    );
    await this.findVideoById.execute(externalId);
    const track: Track = await this.AddTrackToPlaylist.execute(
      +playlistId,
      {
        externalId: externalId,
        name: 'Stromae - Alors On Danse (Official Music Video)',
        duration: 1000 * 30,
      },
      payload.id,
    );
    this.server.to(playlist.name).emit('addTrack', track);
  }

  @SubscribeMessage('removeTrack')
  async handleRemoveTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody('trackId') trackId: number,
    @MessageBody('playlistId') playlistId: number,
  ): Promise<void> {
    const payload = await this.jwtService.verifyAsync(
      client.handshake.headers.authorization,
    );
    const playlist: PlayList = await this.playListsRepository.findById(
      +playlistId,
    );
    await this.removeTrackFromPlaylist.execute(
      +trackId,
      +playlistId,
      payload.id,
    );
    this.server.to(playlist.name).emit('removeTrack', trackId);
  }

  @SubscribeMessage('upVoteTrack')
  async handleUpVoteTrack(
    @ConnectedSocket() client: Socket,
    @MessageBody('playlistId') playlistId: number,
    @MessageBody('trackId') trackId: number,
  ): Promise<void> {
    const payload = await this.jwtService.verifyAsync(
      client.handshake.headers.authorization,
    );
    const playlist: PlayList = await this.playListsRepository.findById(
      +playlistId,
    );
    const newUpVoteCount = await this.upVoteTrack.execute(
      +trackId,
      +payload.id,
    );
    this.server.to(playlist.name).emit('upVoteTrack', trackId, newUpVoteCount);
  }

  @SubscribeMessage('trackReachedEnd')
  handleTrackReachedEnd() {
    // TODO - put the played music to end of the playlist
  }
}
