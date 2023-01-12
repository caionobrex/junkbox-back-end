import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PlayListsModule } from './playlists/playlists.module';
import { TracksModule } from './tracks/tracks.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [PlayListsModule, TracksModule, UsersModule, AuthModule],
})
export class AppModule {}
