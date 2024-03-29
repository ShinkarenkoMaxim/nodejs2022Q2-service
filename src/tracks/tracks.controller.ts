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
import { FavoritesService } from 'src/favorites/services/favorites.service';
import { validate as uuidValidate } from 'uuid';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './services/tracks.service';

@Controller({ path: 'track' })
export class TracksController {
  constructor(
    private tracksService: TracksService,
    private favoritesService: FavoritesService,
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
    if (createTrackDto?.artistId && !uuidValidate(createTrackDto?.artistId)) {
      throw new BadRequestException('Invalid artist id');
    }

    if (createTrackDto?.albumId && !uuidValidate(createTrackDto?.albumId)) {
      throw new BadRequestException('Invalid album id');
    }

    return this.tracksService.create(createTrackDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid track id');
    }

    if (updateTrackDto?.artistId && !uuidValidate(updateTrackDto?.artistId)) {
      throw new BadRequestException('Invalid artist id');
    }

    if (updateTrackDto?.albumId && !uuidValidate(updateTrackDto?.albumId)) {
      throw new BadRequestException('Invalid album id');
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

    this.favoritesService.removeFromFavourites(id, 'tracks');

    if (!result) {
      throw new NotFoundException('Track not found');
    }
  }
}
