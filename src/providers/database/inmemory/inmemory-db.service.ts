import { Injectable } from '@nestjs/common';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { User } from 'src/users/interfaces/user.interface';

@Injectable()
export class InMemoryDBService {
  albums: Album[] = [];
  artists: Artist[] = [];
  tracks: Track[] = [];
  users: User[] = [];

  private static _instance: InMemoryDBService;

  constructor() {
    if (!InMemoryDBService._instance) {
      InMemoryDBService._instance = this;
    }

    return InMemoryDBService._instance;
  }
}
