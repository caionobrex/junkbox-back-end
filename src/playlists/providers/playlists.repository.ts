import { Injectable } from '@nestjs/common';
import { PlayList, Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class PlayListsRepository {
  constructor(private readonly prisma: PrismaService) {}

  insertOne(playlist: Prisma.PlayListCreateInput): Promise<PlayList> {
    return this.prisma.playList.create({ data: playlist });
  }

  findAll(): Promise<PlayList[]> {
    return this.prisma.playList.findMany();
  }

  findById(id: number): Promise<PlayList> {
    return this.prisma.playList.findUnique({ where: { id } });
  }

  updateOne(
    id: number,
    playList: Prisma.PlayListUpdateInput,
  ): Promise<PlayList> {
    return this.prisma.playList.update({ where: { id }, data: playList });
  }

  deleteOne(id: number): Promise<PlayList> {
    return this.prisma.playList.delete({ where: { id } });
  }
}
