import {
  SubscribeMessage,
  WebSocketGateway,
  MessageBody,
  ConnectedSocket,
  WebSocketServer,
} from '@nestjs/websockets';
import { PlayListsRepository } from '../playlists.repository';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class PlaylistsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly playListsRepository: PlayListsRepository) {}

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
    return 'testing';
  }

  @SubscribeMessage('removeSong')
  handleRemoveSong() {
    return 'testing';
  }

  @SubscribeMessage('upVoteSong')
  handleUpVoteSong() {
    return 'testing';
  }
}
