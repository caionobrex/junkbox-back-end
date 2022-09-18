export interface PlayListController {
  addSong: (songId: number) => void;

  removeSong: (songId: number) => void;

  upVoteSong: () => void;

  updateSong: () => void;
}
