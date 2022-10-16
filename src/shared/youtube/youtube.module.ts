import { Module } from '@nestjs/common';
import { FindVideoByIdService } from './providers/services/find-video-by-id';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [FindVideoByIdService],
  exports: [FindVideoByIdService],
})
export class YoutubeModule {}
