import { Injectable } from '@nestjs/common';
import { PlayListController } from '../interfaces/playlist-controller.interface';

@Injectable()
export class SpotifyPlayListControllerImpl implements PlayListController {
  addSong: (songId: number) => {
    //
  };

  removeSong: (songId: number) => {
    // todo
  };

  upVoteSong: () => {
    // todo
  };

  updateSong: () => {
    // todo
  };
}
