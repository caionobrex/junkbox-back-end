import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PlayListsModule } from './playlists/playlists.module';
import { SongsModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PlayListsModule, SongsModule, UsersModule, AuthModule],
})
export class AppModule {}
