import { CacheModule, Module } from '@nestjs/common';
import { PlayListsController } from './controllers/playlists.controller';
import { PlaylistsGateway } from './providers/gateways/playlists.gateway';
import { PlayListsRepository } from './providers/playlists.repository';
import PlaylistsServices from './providers/services';
import { PrismaService } from 'src/prisma.service';
import { TracksModule } from '@/tracks/tracks.module';
import { JwtModule } from '@nestjs/jwt';
import { YoutubeModule } from '@/shared/youtube/youtube.module';
import { HttpModule } from '@nestjs/axios';
import { TracksRepository } from '@/tracks/providers/tracks.repository';

@Module({
  controllers: [PlayListsController],
  providers: [
    PrismaService,
    ...PlaylistsServices,
    PlayListsRepository,
    TracksRepository,
    PlaylistsGateway,
  ],
  imports: [
    CacheModule.register(),
    HttpModule,
    TracksModule,
    YoutubeModule,
    JwtModule.register({
      secret: 'testing',
      signOptions: { expiresIn: '30m' },
    }),
  ],
})
export class PlayListsModule {}
