import { Module } from '@nestjs/common';
import { PlayListsModule } from './playlists/playlists.module';
import { SongsModule } from './songs/songs.module';

@Module({
  imports: [PlayListsModule, SongsModule],
})
export class AppModule {}
