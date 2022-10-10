import { CreateNewPlaylistService } from './create-new-playlist.service';
import { FindAllPlaylistsService } from './find-all-playlists.service';
import { FindPlaylistById } from './find-playlist-by-id';
import { DeletePlaylistByIdService } from './delete-playlist.service';
import { AddTrackToPlaylistService } from './add-track-to-playlist.service';
import { RemoveTrackFromPlaylistService } from './remove-track-from-playlist.service';

export default [
  CreateNewPlaylistService,
  FindAllPlaylistsService,
  FindPlaylistById,
  DeletePlaylistByIdService,
  AddTrackToPlaylistService,
  RemoveTrackFromPlaylistService,
];
