import { Module } from '@nestjs/common';
// import { AlbumsService } from 'src/albums/services/albums.service';
// import { ArtistsService } from 'src/artists/services/artists.service';
// import { PrismaService } from 'src/providers/database/prisma/prisma.service';
// import { TracksService } from 'src/tracks/services/tracks.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './services/favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    // ArtistsService,
    // AlbumsService,
    // TracksService,
    // PrismaService,
  ],
})
export class FavoritesModule {}
