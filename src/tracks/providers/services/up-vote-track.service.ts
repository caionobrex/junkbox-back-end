import { Injectable } from '@nestjs/common';
import { UpVote } from '@prisma/client';
import { TracksRepository } from '../tracks.repository';
import { UpVotesRepository } from '../upvotes.repository';

@Injectable()
export class UpVoteTrackService {
  constructor(
    private readonly upVotesRepository: UpVotesRepository,
    private readonly tracksRepository: TracksRepository,
  ) {}

  async execute(trackId: number, userId: number): Promise<number> {
    const where = { trackId, userId };
    const upVotes: UpVote[] = await this.upVotesRepository.findAll(where);
    if (upVotes.length > 0)
      throw new Error('You cannot upvote twice the same track');
    await this.upVotesRepository.createOne({
      by: { connect: { id: userId } },
      track: { connect: { id: trackId } },
    });
    const track = await this.tracksRepository.updateOne(trackId, {
      upvoteCount: { increment: 1 },
    });
    return track.upvoteCount;
  }
}
