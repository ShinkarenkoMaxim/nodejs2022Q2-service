import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  NotFoundException,
  BadRequestException,
  HttpCode,
} from '@nestjs/common';
// import { AlbumsService } from 'src/albums/services/albums.service';
// import { TracksService } from 'src/tracks/services/tracks.service';
// import { FavoritesService } from 'src/favorites/services/favorites.service';
import { validate as uuidValidate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsService } from './services/artists.service';

@Controller({ path: 'artist' })
export class ArtistsController {
  constructor(
    private artistsService: ArtistsService, // private albumsService: AlbumsService, // private tracksService: TracksService,
  ) // private favoritesService: FavoritesService,
  {}

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = await this.artistsService.findOneById(id);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artist id');
    }

    const artist = await this.artistsService.update(id, updateArtistDto);
    if (!artist) {
      throw new NotFoundException('Artist not found');
    }

    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid artist id');
    }

    const result = await this.artistsService.delete(id);

    // this.albumsService.removeArtistReferencesIfExist(id);
    // this.tracksService.removeArtistReferencesIfExist(id);
    // this.favoritesService.removeFromFavourites(id, 'artists');

    if (!result) {
      throw new NotFoundException('Artist not found');
    }
  }
}
