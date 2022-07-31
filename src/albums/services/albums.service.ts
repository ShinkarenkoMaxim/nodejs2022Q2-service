import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';
import { CreateAlbumDto } from '../dto/create-album.dto';
import { UpdateAlbumDto } from '../dto/update-album.dto';
import { Album } from '../interfaces/album.interface';

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    return this.prisma.album.create({
      data: {
        ...createAlbumDto,
      },
    });
  }

  findAll(): Promise<Album[]> {
    return this.prisma.album.findMany();
  }

  findOneById(id: string): Promise<Album> {
    return this.prisma.album.findUnique({ where: { id } });
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<Album> {
    return this.prisma.album.update({
      where: { id },
      data: { ...updateAlbumDto },
    });
  }

  async delete(id: string): Promise<Album> {
    return this.prisma.album.delete({ where: { id } });
  }
}
