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
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsService } from './services/albums.service';

@Controller({ path: 'album' })
export class AlbumsController {
  constructor(private albumsService: AlbumsService) {}

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
    return this.albumsService.create(createAlbumDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    if (!uuidValidate(id)) {
      throw new BadRequestException('Invalid album id');
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

    if (!result) {
      throw new NotFoundException('Album not found');
    }
  }
}
