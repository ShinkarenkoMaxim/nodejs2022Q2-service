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
import { validate as uuidValidate } from 'uuid';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistsService } from './services/artists.service';

@Controller({ path: 'artists' })
export class ArtistsController {
  constructor(private artistsService: ArtistsService) {}

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const user = this.artistsService.findOneById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    const newUser = this.artistsService.create(createArtistDto);
    return newUser;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateArtistDto: UpdateArtistDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const artist = this.artistsService.update(id, updateArtistDto);
    if (!artist) {
      throw new NotFoundException('User not found');
    }

    return artist;
  }

  @Delete(':id')
  @HttpCode(204)
  delete(@Param('id') id: string) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid user id');
    }

    const result = this.artistsService.delete(id);

    if (!result) {
      throw new NotFoundException('User not found');
    }
  }
}
