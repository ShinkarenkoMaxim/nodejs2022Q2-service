import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../interfaces/artist.interface';

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
    let foundedArtist: Artist | null = null;

    for (let i = 0; i < this.artists.length; i++) {
      const artist = this.artists[i];
      if (artist.id === id) {
        foundedArtist = artist;
        break;
      }
    }

    return foundedArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    let foundedArtist = null;

    for (let i = 0; i < this.artists.length; i++) {
      let artist = this.artists[i];

      if (artist.id === id) {
        artist = Object.assign(artist, updateArtistDto);
        foundedArtist = artist;
        break;
      }
    }

    return foundedArtist;
  }

  delete(id: string): boolean {
    const artistIdx = this.artists.findIndex((artist) => artist.id === id);

    if (artistIdx === -1) {
      return false;
    }

    this.artists.splice(artistIdx, 1);

    return true;
  }
}
