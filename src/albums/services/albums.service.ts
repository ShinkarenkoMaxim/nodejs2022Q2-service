import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../interfaces/album.interface';

@Injectable()
export class AlbumsService {
  private albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    this.albums.push(newAlbum);

    return newAlbum;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOneById(id: string): Album {
    let foundedAlbum: Album | null = null;

    for (let i = 0; i < this.albums.length; i++) {
      const album = this.albums[i];
      if (album.id === id) {
        foundedAlbum = album;
        break;
      }
    }

    return foundedAlbum;
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Album {
    let foundedAlbum = null;

    for (let i = 0; i < this.albums.length; i++) {
      let album = this.albums[i];

      if (album.id === id) {
        album = Object.assign(album, updateAlbumDto);
        foundedAlbum = album;
        break;
      }
    }

    return foundedAlbum;
  }

  delete(id: string): boolean {
    const albumIdx = this.albums.findIndex((album) => album.id === id);

    if (albumIdx === -1) {
      return false;
    }

    this.albums.splice(albumIdx, 1);

    return true;
  }
}
