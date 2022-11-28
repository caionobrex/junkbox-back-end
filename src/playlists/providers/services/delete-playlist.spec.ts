import { PlayListsRepository } from '../playlists.repository';
import { DeletePlaylistByIdService } from './delete-playlist.service';
import { FindPlaylistById } from './find-playlist-by-id.service';

describe('DeletePlaylistByIdService', () => {
  let deletePlaylistByIdService: DeletePlaylistByIdService;
  let findPlaylistById: FindPlaylistById;
  let playlistRepository: PlayListsRepository;
  beforeEach(() => {
    // deletePlaylistByIdService = new DeletePlaylistByIdService();
    // findPlaylistById = new FindPlaylistById();
    // playlistRepository = new PlayListsRepository();
  });
  describe('execute', () => {
    const playlistId = 1;
    let userId: number;
    it('should throw an error if user is not the playlist owner', async () => {
      userId = 2;
      expect(
        await deletePlaylistByIdService.execute(playlistId, userId),
      ).toThrow('Not allowed. You are not the host of this playlist');
    });
    it('should delete the playlist and all his tracks', async () => {
      userId = 1;
      const deletedPlaylist = await deletePlaylistByIdService.execute(
        playlistId,
        userId,
      );
      expect(deletedPlaylist.id).toBe(playlistId);
      expect(await findPlaylistById.execute(playlistId)).toBe(null);
      expect((await playlistRepository.findAllTracks(playlistId)).length).toBe(
        0,
      );
    });
  });
});
