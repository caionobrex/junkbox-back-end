import { CreateNewPlaylistService } from './create-new-playlist.service';
import { FindAllPlaylistsService } from './find-all-playlists.service';
import { FindPlaylistById } from './find-play-list-by-id';
import { DeletePlaylistByIdService } from './delete-playlist.service';

export default [
  CreateNewPlaylistService,
  FindAllPlaylistsService,
  FindPlaylistById,
  DeletePlaylistByIdService,
];
