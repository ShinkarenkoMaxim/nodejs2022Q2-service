import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/albums/services/albums.service';
import { TracksService } from 'src/tracks/services/tracks.service';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './services/artists.service';
// import { FavoritesService } from 'src/favorites/services/favorites.service';
import { PrismaService } from 'src/providers/database/prisma/prisma.service';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    AlbumsService,
    TracksService,
    // FavoritesService,
    PrismaService,
  ],
})
export class ArtistsModule {}
