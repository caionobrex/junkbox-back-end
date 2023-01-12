import { PrismaService } from '@/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma, UpVote } from '@prisma/client';

@Injectable()
export class UpVotesRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll(where: Prisma.UpVoteWhereInput): Promise<UpVote[]> {
    return this.prisma.upVote.findMany({
      where,
      include: { by: true, track: true },
    });
  }

  createOne(upVote: Prisma.UpVoteCreateInput): Promise<UpVote> {
    return this.prisma.upVote.create({ data: upVote });
  }
}
