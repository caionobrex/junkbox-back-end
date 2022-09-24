import { Module } from '@nestjs/common';
import { PlayListsController } from './controllers/playlists.controller';
import { PlaylistsGateway } from './providers/gateways/playlists.gateway';
import { PlayListsRepository } from './providers/playlists.repository';
import PlaylistsServices from './providers/services';
import { PrismaService } from 'src/prisma.service';
import { SongsModule } from '@/songs/songs.module';

@Module({
  controllers: [PlayListsController],
  providers: [
    PrismaService,
    ...PlaylistsServices,
    PlayListsRepository,
    PlaylistsGateway,
  ],
  imports: [SongsModule],
})
export class PlayListsModule {}
