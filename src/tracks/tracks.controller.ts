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
  ForbiddenException,
  HttpCode,
} from '@nestjs/common';
import { AlbumsService } from 'src/albums/services/albums.service';
import { ArtistsService } from 'src/artists/services/artists.service';
import { validate as uuidValidate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './services/tracks.service';

@Controller({ path: 'track' })
export class TracksController {
  constructor(
    private tracksService: TracksService,
    private artistsService: ArtistsService,
    private albumsService: AlbumsService,
  ) {}

  @Get()
  findAll() {
    return this.tracksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid track id');
    }

    const track = this.tracksService.findOneById(id);
    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    if (createTrackDto?.artistId) {
      if (!uuidValidate(createTrackDto.artistId)) {
        throw new BadRequestException('Invalid artist id');
      }

      const artist = this.artistsService.findOneById(createTrackDto.artistId);
      if (!artist) {
        throw new NotFoundException('Artist not found');
      }
    }

    if (createTrackDto?.albumId) {
      if (!uuidValidate(createTrackDto.albumId)) {
        throw new BadRequestException('Invalid album id');
      }

      const artist = this.artistsService.findOneById(createTrackDto.albumId);
      if (!artist) {
        throw new NotFoundException('Album not found');
      }
    }

    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid track id');
    }

    if (updateTrackDto?.artistId) {
      if (!uuidValidate(updateTrackDto.artistId)) {
        throw new BadRequestException('Invalid artist id');
      }

      const artist = this.albumsService.findOneById(updateTrackDto.artistId);
      if (!artist) {
        throw new NotFoundException('Artist not found');
      }
    }

    if (updateTrackDto?.albumId) {
      if (!uuidValidate(updateTrackDto.albumId)) {
        throw new BadRequestException('Invalid album id');
      }

      const artist = this.albumsService.findOneById(updateTrackDto.albumId);
      if (!artist) {
        throw new NotFoundException('Album not found');
      }
    }

    const track = this.tracksService.update(id, updateTrackDto);

    if (!track) {
      throw new NotFoundException('Track not found');
    }

    return track;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid track id');
    }

    const result = this.tracksService.delete(id);

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
