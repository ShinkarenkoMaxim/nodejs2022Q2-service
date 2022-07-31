import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';
import { CreateArtistDto } from '../dto/create-artist.dto';
import { UpdateArtistDto } from '../dto/update-artist.dto';
import { Artist } from '../interfaces/artist.interface';

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  create(createArtistDto: CreateArtistDto): Promise<Artist> {
    return this.prisma.artist.create({ data: createArtistDto });
  }

  findAll(): Promise<Artist[]> {
    return this.prisma.artist.findMany();
  }

  findOneById(id: string): Promise<Artist> {
    return this.prisma.artist.findUnique({ where: { id } });
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  delete(id: string): Promise<Artist> {
    return this.prisma.artist.delete({ where: { id } });
  }
}
