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
import { ArtistsService } from 'src/artists/services/artists.service';
import { TracksService } from 'src/tracks/services/tracks.service';
import { validate as uuidValidate } from 'uuid';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsService } from './services/albums.service';

@Controller({ path: 'album' })
export class AlbumsController {
  constructor(
    private albumsService: AlbumsService,
    private artistsService: ArtistsService,
    private tracksService: TracksService,
  ) {}

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid album id');
    }

    const album = this.albumsService.findOneById(id);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    if (createAlbumDto?.artistId) {
      if (!uuidValidate(createAlbumDto.artistId)) {
        throw new BadRequestException('Invalid artist id');
      }

      const artist = this.artistsService.findOneById(createAlbumDto.artistId);
      if (!artist) {
        throw new NotFoundException('Artist not found');
      }
    }

    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid album id');
    }

    if (updateAlbumDto?.artistId) {
      if (!uuidValidate(updateAlbumDto.artistId)) {
        throw new BadRequestException('Invalid artist id');
      }

      const artist = this.artistsService.findOneById(updateAlbumDto.artistId);
      if (!artist) {
        throw new NotFoundException('Artist not found');
      }
    }

    const album = this.albumsService.update(id, updateAlbumDto);
    if (!album) {
      throw new NotFoundException('Album not found');
    }

    return album;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid album id');
    }

    const result = this.albumsService.delete(id);

    this.tracksService.removeAlbumReferencesIfExist(id);

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }
}
