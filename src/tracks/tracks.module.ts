import { PrismaService } from '@/prisma.service';
import { Module } from '@nestjs/common';
import { UpVoteTrackService } from './providers/services/up-vote-track.service';
import { TracksRepository } from './providers/tracks.repository';
import { UpVotesRepository } from './providers/upvotes.repository';

@Module({
  providers: [
    PrismaService,
    TracksRepository,
    UpVotesRepository,
    UpVoteTrackService,
  ],
  exports: [TracksRepository, UpVoteTrackService],
})
export class TracksModule {}
