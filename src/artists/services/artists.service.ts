import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../interfaces/artists.interface';

type UpdateArtistResult = {
  record: Artist;
  successfullyUpdated: boolean;
};

@Injectable()
export class ArtistsService {
  private artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);

    return newArtist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOneById(id: string): Artist {
    let foundedUser: Artist | null = null;

    for (let i = 0; i < this.artists.length; i++) {
      const artist = this.artists[i];
      if (artist.id === id) {
        foundedUser = artist;
        break;
      }
    }

    return foundedUser;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): UpdateArtistResult {
    let foundedUser = null;

    for (let i = 0; i < this.artists.length; i++) {
      let artist = this.artists[i];

      if (artist.id === id) {
        artist = Object.assign(artist, updateArtistDto);
        foundedUser = artist;
        break;
      }
    }

    return foundedUser;
  }

  delete(id: string): boolean {
    const userIdx = this.artists.findIndex((user) => user.id === id);

    if (userIdx === -1) {
      return false;
    }

    this.artists.splice(userIdx, 1);

    return true;
  }
}
