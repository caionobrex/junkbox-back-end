import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { PlayListController } from '../../interfaces/playlist-controller.interface';
import { PlayListsRepository } from '../playlists.repository';
import { Inject } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PlaylistsGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly playListsRepository: PlayListsRepository,
    @Inject('PlayListController')
    private readonly playListController: PlayListController,
  ) {}

  @SubscribeMessage('joinPlaylist')
  handleJoinPlaylist(
    @ConnectedSocket() client: Socket,
    @MessageBody('playlistName') playlistName: string,
  ) {
    client.join(playlistName);
    return 'testing';
  }

  @SubscribeMessage('leavePlaylist')
  handleLeavePlaylist() {
    return 'testing';
  }

  @SubscribeMessage('addSong')
  handleAddSong() {
    this.playListController.addSong(1);
    return 'testing';
  }

  @SubscribeMessage('removeSong')
  handleRemoveSong() {
    this.playListController.removeSong(1);
    return 'testing';
  }

  @SubscribeMessage('upVoteSong')
  handleUpVoteSong() {
    return 'testing';
  }
}
