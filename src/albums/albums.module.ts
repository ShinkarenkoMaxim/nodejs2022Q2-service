import { Module } from '@nestjs/common';
import { ArtistsService } from 'src/artists/services/artists.service';
// import { FavoritesService } from 'src/favorites/services/favorites.service';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';
import { TracksService } from 'src/tracks/services/tracks.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [
    AlbumsService,
    ArtistsService,
    TracksService,
    // FavoritesService,
    PrismaService,
  ],
})
export class AlbumsModule {}
