import { validate as uuidValidate } from 'uuid';
import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ArtistsService } from 'src/artists/services/artists.service';
import { FavoritesService } from './services/favorites.service';
import { AlbumsService } from 'src/albums/services/albums.service';
import { TracksService } from 'src/tracks/services/tracks.service';

@Controller({ path: 'favs' })
export class FavoritesController {
  constructor(
    private favoritesService: FavoritesService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
    private tracksService: TracksService,
  ) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('/artist/:id')
  addArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = this.artistsService.findOneById(id);
    if (!artist) {
      throw new UnprocessableEntityException('Artist not found');
    }

    this.favoritesService.addToFavourites(id, 'artists');

    return { ok: true, message: 'Artist successfully added.' };
  }

  @Post('/album/:id')
  addAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = this.albumsService.findOneById(id);
    if (!album) {
      throw new UnprocessableEntityException('Album not found');
    }

    this.favoritesService.addToFavourites(id, 'albums');

    return { ok: true, message: 'Album successfully added.' };
  }

  @Post('/track/:id')
  addTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid track id');
    }

    const track = this.tracksService.findOneById(id);
    if (!track) {
      throw new UnprocessableEntityException('Track not found');
    }

    this.favoritesService.addToFavourites(id, 'tracks');

    return { ok: true, message: 'Track successfully added.' };
  }

  @Delete('/artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artist id');
    }

    const result = this.favoritesService.removeFromFavourites(id, 'artists');

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }

  @Delete('/album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid album id');
    }

    const result = this.favoritesService.removeFromFavourites(id, 'albums');

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }

  @Delete('/track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid track id');
    }

    const result = this.favoritesService.removeFromFavourites(id, 'tracks');

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
