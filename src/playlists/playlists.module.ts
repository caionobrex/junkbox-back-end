import { Module } from '@nestjs/common';
import { PlayListsController } from './controllers/playlists.controller';
import { PlaylistsGateway } from './providers/gateways/playlists.gateway';
import { PlayListsRepository } from './providers/playlists.repository';
import { SpotifyPlayListControllerImpl } from './providers/spotify-playlist-controller-impl';
import PlaylistsServices from './providers/services';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [PlayListsController],
  providers: [
    PrismaService,
    ...PlaylistsServices,
    PlayListsRepository,
    PlaylistsGateway,
    {
      provide: 'PlayListController',
      useClass: SpotifyPlayListControllerImpl,
    },
  ],
})
export class PlayListsModule {}
