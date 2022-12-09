import { Prisma, PlayList, Track } from '@prisma/client';
import { IPlayListsRepository } from '../playlists.repository';
import { DeletePlaylistByIdService } from './delete-playlist.service';
import { FindPlaylistById } from './find-playlist-by-id.service';

export class PlayListsRepositoryMock implements IPlayListsRepository {
  insertOne(playlist: Prisma.PlayListCreateInput): Promise<PlayList> {
    return Promise.resolve({
      id: 1,
      description: playlist.description,
      createdAt: new Date(),
      image: playlist.image,
      isPrivate: playlist.isPrivate,
      maxLength: playlist.maxLength,
      name: playlist.name,
      password: playlist.password,
      tracksCount: playlist.tracksCount,
      updatedAt: new Date(),
      userId: 1,
    });
  }

  findAll(): Promise<PlayList[]> {
    return Promise.resolve([
      {
        id: 1,
        description: '',
        createdAt: new Date(),
        image: '',
        isPrivate: false,
        maxLength: 10,
        name: '',
        password: '',
        tracksCount: 0,
        updatedAt: new Date(),
        userId: 1,
      },
    ]);
  }

  findById(id: number): Promise<PlayList> {
    throw new Error('Method not implemented.');
  }

  findByName(name: string): Promise<PlayList> {
    throw new Error('Method not implemented.');
  }

  findAllTracks(playlistId: number): Promise<Track[]> {
    throw new Error('Method not implemented.');
  }

  findTrackByExternalId(
    externalId: string,
    playlistId: number,
  ): Promise<Track> {
    throw new Error('Method not implemented.');
  }

  updateOne(
    id: number,
    playList: Prisma.PlayListUpdateInput,
  ): Promise<PlayList> {
    throw new Error('Method not implemented.');
  }

  deleteOne(id: number): Promise<PlayList> {
    throw new Error('Method not implemented.');
  }

  deleteTrack(id: number): Promise<Track> {
    throw new Error('Method not implemented.');
  }
}

describe('DeletePlaylistByIdService', () => {
  let deletePlaylistByIdService: DeletePlaylistByIdService;
  let findPlaylistById: FindPlaylistById;
  let playlistRepository: IPlayListsRepository;
  beforeEach(() => {
    playlistRepository = new PlayListsRepositoryMock();
    deletePlaylistByIdService = new DeletePlaylistByIdService(
      playlistRepository,
    );
    findPlaylistById = new FindPlaylistById(playlistRepository);
    jest.spyOn(playlistRepository, 'deleteOne').mockImplementation(() =>
      Promise.resolve(
        Promise.resolve({
          id: 1,
          description: '',
          createdAt: new Date(),
          image: '',
          isPrivate: false,
          maxLength: 10,
          name: '',
          password: '',
          tracksCount: 0,
          updatedAt: new Date(),
          userId: 1,
        }),
      ),
    );
  });
  describe('execute', () => {
    const playlistId = 1;
    let userId: number;
    it('should throw an error if user is not the playlist owner', async () => {
      jest.spyOn(playlistRepository, 'findById').mockImplementation(() =>
        Promise.resolve({
          id: 2,
          description: '',
          createdAt: new Date(),
          image: '',
          isPrivate: false,
          maxLength: 10,
          name: '',
          password: '',
          tracksCount: 0,
          updatedAt: new Date(),
          userId: 1,
        }),
      );
      userId = 2;
      expect(
        async () => await deletePlaylistByIdService.execute(playlistId, userId),
      ).rejects.toThrow('Not allowed. You are not the host of this playlist');
    });
    // it('should delete the playlist and all his tracks', async () => {
    //   userId = 1;
    //   const deletedPlaylist = await deletePlaylistByIdService.execute(
    //     playlistId,
    //     userId,
    //   );
    //   expect(deletedPlaylist.id).toBe(playlistId);
    //   expect(async () => await findPlaylistById.execute(playlistId)).toBe(null);
    //   expect(
    //     async () => (await playlistRepository.findAllTracks(playlistId)).length,
    //   ).toBe(0);
    // });
  });
});
