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

@WebSocketGateway({ cors: true })
export class PlaylistsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly playListsRepository: PlayListsRepository,
    private readonly AddTrackToPlaylist: AddTrackToPlaylistService,
    private readonly removeTrackFromPlaylist: RemoveTrackFromPlaylistService,
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
    const playlist: PlayList = await this.playListsRepository.findById(
      +playlistId,
    );
    // TODO - make request data api and retrieve data
    const track: Track = await this.AddTrackToPlaylist.execute(
      +playlistId,
      {
        externalId: 'VHoT4N43jK8',
        name: 'Stromae - Alors On Danse (Official Music Video)',
        duration: 1000 * 30,
      },
      payload.id,
    );
    this.server.to(playlist.name).emit('addTrack', track);
  }

  @SubscribeMessage('removeTrack')
  async handleRemoveTrack(): Promise<void> {
    this.removeTrackFromPlaylist.execute(1, 2);
  }

  @SubscribeMessage('upVoteTrack')
  handleUpVoteTrack() {
    return 'testing';
  }

  @SubscribeMessage('trackReachedEnd')
  handleTrackReachedEnd() {
    // TODO - put the played music to end of the playlist
  }
}
