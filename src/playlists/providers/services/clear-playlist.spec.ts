import { PlayListsRepository } from '../playlists.repository';
import { ClearPlaylistService } from './clear-playlist.service';
import { FindPlaylistById } from './find-playlist-by-id.service';

describe('ClearPlaylistService', () => {
  let clearPlaylistService: ClearPlaylistService;
  let findPlaylistById: FindPlaylistById;
  let playlistsRepository: PlayListsRepository;
  beforeEach(() => {
    // clearPlaylistService = new ClearPlaylistService();
    // findPlaylistById = new FindPlaylistById();
    // playlistsRepository = new PlayListsRepository();
  });
  describe('execute', () => {
    it('should delete all tracks from a given playlist if the user is the playlist owner', async () => {
      const playlistId = 1;
      await clearPlaylistService.execute(playlistId, 2);
      const playlist = await findPlaylistById.execute(playlistId);
      const tracks = await playlistsRepository.findAllTracks(playlistId);
      expect(playlist.tracksCount).toBe(0);
      expect(tracks.length).toBe(0);
    });
  });
});
