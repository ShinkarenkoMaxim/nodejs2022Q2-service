import { Injectable } from '@nestjs/common';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../interfaces/track.interface';

@Injectable()
export class TracksService {
  constructor(private db: InMemoryDBService) {}

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };

    this.db.tracks.push(newTrack);

    return newTrack;
  }

  findAll(): Track[] {
    return this.db.tracks;
  }

  findOneById(id: string): Track {
    let foundedTrack: Track | null = null;

    for (let i = 0; i < this.db.tracks.length; i++) {
      const track = this.db.tracks[i];
      if (track.id === id) {
        foundedTrack = track;
        break;
      }
    }

    return foundedTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    let foundedTrack = null;

    for (let i = 0; i < this.db.tracks.length; i++) {
      let track = this.db.tracks[i];
      if (track.id === id) {
        track = Object.assign(track, updateTrackDto);
        foundedTrack = track;
        break;
      }
    }

    return foundedTrack;
  }

  delete(id: string): boolean {
    const trackIdx = this.db.tracks.findIndex((track) => track.id === id);

    if (trackIdx === -1) {
      return false;
    }

    this.db.tracks.splice(trackIdx, 1);

    return true;
  }

  removeArtistReferencesIfExist(artistId: string): void {
    for (let i = 0; i < this.db.tracks.length; i++) {
      const track = this.db.tracks[i];
      if (track.artistId === artistId) {
        track.artistId = null;
      }
    }

    return;
  }

  removeAlbumReferencesIfExist(albumId: string): void {
    for (let i = 0; i < this.db.tracks.length; i++) {
      const track = this.db.tracks[i];
      if (track.albumId === albumId) {
        track.albumId = null;
      }
    }

    return;
  }
}
