import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { Album } from 'src/albums/interfaces/album.interface';
import { Artist } from 'src/artists/interfaces/artist.interface';
import { Track } from 'src/tracks/interfaces/track.interface';
import { FavoritesRepsonse } from '../interfaces/favorites.interface';

@Injectable()
export class FavoritesService {
  constructor(private db: InMemoryDBService) {}

  findAll(): FavoritesRepsonse {
    const artistsIds: string[] = this.db.favorites.artists;
    const artists: Artist[] = this.db.artists.filter((artist: Artist) =>
      artistsIds.includes(artist.id),
    );

    const albumsIds: string[] = this.db.favorites.albums;
    const albums: Album[] = this.db.albums.filter((album: Album) =>
      albumsIds.includes(album.id),
    );

    const tracksIds: string[] = this.db.favorites.tracks;
    const tracks: Track[] = this.db.tracks.filter((track: Track) =>
      tracksIds.includes(track.id),
    );

    return {
      artists,
      albums,
      tracks,
    };
  }

  addToFavourites(entityId: string, entityType: string): void {
    const alreadyExist = this.db.favorites[entityType].includes(entityId);

    if (!alreadyExist) {
      this.db.favorites[entityType].push(entityId);
    }
  }

  removeFromFavourites(entityId: string, entityType: string): boolean {
    const entityIdx = this.db.favorites[entityType].findIndex(
      (idx: string) => idx === entityId,
    );

    if (entityIdx === -1) {
      return false;
    }

    this.db.favorites[entityType].splice(entityIdx, 1);

    return true;
  }
}
