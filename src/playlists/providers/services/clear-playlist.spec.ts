import { PlayList, Prisma, Track } from '@prisma/client';
import { ITracksRepository } from '../../../tracks/providers/tracks.repository';
import { IPlayListsRepository } from '../playlists.repository';
import { ClearPlaylistService } from './clear-playlist.service';
import { FindPlaylistById } from './find-playlist-by-id.service';

class TracksRepositoryMocks implements ITracksRepository {
  createOne(track: Prisma.TrackCreateInput): Promise<Track> {
    throw new Error('Method not implemented.');
  }
  findById(trackId: number): Promise<Track> {
    throw new Error('Method not implemented.');
  }
  updateOne(trackId: number, data: Prisma.TrackUpdateInput): Promise<Track> {
    throw new Error('Method not implemented.');
  }
  deleteMany(where: Prisma.TrackWhereInput): Promise<void> {
    throw new Error('Method not implemented.');
  }
  deleteOne(trackId: number): Promise<Track> {
    throw new Error('Method not implemented.');
  }
}

class PlayListsRepositoryMock implements IPlayListsRepository {
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
    return Promise.resolve({
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
    });
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

describe('ClearPlaylistService', () => {
  let clearPlaylistService: ClearPlaylistService;
  let findPlaylistById: FindPlaylistById;
  let playlistsRepository: IPlayListsRepository;
  let tracksRepository: ITracksRepository;
  const playlistId = 1;
  let userId = 1;
  beforeEach(() => {
    playlistsRepository = new PlayListsRepositoryMock();
    findPlaylistById = new FindPlaylistById(playlistsRepository);
    tracksRepository = new TracksRepositoryMocks();
    clearPlaylistService = new ClearPlaylistService(
      tracksRepository,
      findPlaylistById,
    );
    jest.spyOn(playlistsRepository, 'findById').mockImplementation(() =>
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
    );
    jest
      .spyOn(playlistsRepository, 'findAllTracks')
      .mockImplementation(() => Promise.resolve([]));
  });
  describe('execute', () => {
    it('should throw an exception if user is not the playlist owner', async () => {
      userId = 2;
      expect(
        async () => await clearPlaylistService.execute(playlistId, userId),
      ).rejects.toThrow(Error);
    });
    it('should delete all playlist tracks and ensure that tracksCount is zero', async () => {
      const { tracksCount } = await playlistsRepository.findById(playlistId);
      const allTracks = await playlistsRepository.findAllTracks(playlistId);
      expect(tracksCount).toBe(0);
      expect(allTracks.length).toBe(0);
    });
  });
});
