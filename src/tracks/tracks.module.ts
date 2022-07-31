import { Module } from '@nestjs/common';
// import { FavoritesService } from 'src/favorites/services/favorites.service';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService, PrismaService],
})
export class TracksModule {}
