import { CacheModule, Module } from '@nestjs/common';
import { PlayListsController } from './controllers/playlists.controller';
import { PlaylistsGateway } from './providers/gateways/playlists.gateway';
import { PlayListsRepository } from './providers/playlists.repository';
import PlaylistsServices from './providers/services';
import { PrismaService } from 'src/prisma.service';
import { SongsModule } from '@/songs/songs.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [PlayListsController],
  providers: [
    PrismaService,
    ...PlaylistsServices,
    PlayListsRepository,
    PlaylistsGateway,
  ],
  imports: [
    CacheModule.register(),
    SongsModule,
    JwtModule.register({
      secret: 'testing',
      signOptions: { expiresIn: '30m' },
    }),
  ],
})
export class PlayListsModule {}
