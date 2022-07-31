import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';
import { CreateTrackDto } from '../dto/create-track.dto';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { Track } from '../interfaces/track.interface';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.prisma.track.create({
      data: {
        ...createTrackDto,
      },
    });
  }

  findAll(): Promise<Track[]> {
    return this.prisma.track.findMany();
  }

  findOneById(id: string): Promise<Track> {
    return this.prisma.track.findUnique({ where: { id } });
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<Track> {
    return this.prisma.track.update({
      where: { id },
      data: { ...updateTrackDto },
    });
  }

  delete(id: string): Promise<Track> {
    return this.prisma.track.delete({ where: { id } });
  }
}
