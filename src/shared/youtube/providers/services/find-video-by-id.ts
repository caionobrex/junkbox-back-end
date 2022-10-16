import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

interface YoutubeItem {
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

const baseURL = 'https://www.googleapis.com/youtube/v3';
const accessToken = 'dsadsa';

@Injectable()
export class FindVideoByIdService {
  constructor(private readonly httpService: HttpService) {}

  async execute(id: string): Promise<YoutubeItem | null> {
    const { data } = await this.httpService.axiosRef.get<YoutubeItem>(
      `${baseURL}/videos?id=${id}&access_token${accessToken}`,
    );
    return data;
  }
}
