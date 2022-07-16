import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  constructor(private db: InMemoryDBService) {}

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.db.artists.push(newArtist);

    return newArtist;
  }

  findAll(): Artist[] {
    return this.db.artists;
  }

  findOneById(id: string): Artist {
    let foundedArtist: Artist | null = null;

    for (let i = 0; i < this.db.artists.length; i++) {
      const artist = this.db.artists[i];
      if (artist.id === id) {
        foundedArtist = artist;
        break;
      }
    }

    return foundedArtist;
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Artist {
    let foundedArtist = null;

    for (let i = 0; i < this.db.artists.length; i++) {
      let artist = this.db.artists[i];

      if (artist.id === id) {
        artist = Object.assign(artist, updateArtistDto);
        foundedArtist = artist;
        break;
      }
    }

    return foundedArtist;
  }

  delete(id: string): boolean {
    const artistIdx = this.db.artists.findIndex((artist) => artist.id === id);

    if (artistIdx === -1) {
      return false;
    }

    this.db.artists.splice(artistIdx, 1);

    return true;
  }
}
