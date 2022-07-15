import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../interfaces/track.interface';

@Injectable()
export class TracksService {
  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack = {
      id: uuidv4(),
      ...createTrackDto,
    };

    this.tracks.push(newTrack);

    return newTrack;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOneById(id: string): Track {
    let foundedTrack: Track | null = null;

    for (let i = 0; i < this.tracks.length; i++) {
      const track = this.tracks[i];
      if (track.id === id) {
        foundedTrack = track;
        break;
      }
    }

    return foundedTrack;
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Track {
    let foundedTrack = null;

    for (let i = 0; i < this.tracks.length; i++) {
      let track = this.tracks[i];
      if (track.id === id) {
        track = Object.assign(track, updateTrackDto);
        foundedTrack = track;
        break;
      }
    }

    return foundedTrack;
  }

  delete(id: string): boolean {
    const trackIdx = this.tracks.findIndex((track) => track.id === id);

    if (trackIdx === -1) {
      return false;
    }

    this.tracks.splice(trackIdx, 1);

    return true;
  }
}
