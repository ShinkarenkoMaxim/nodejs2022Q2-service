import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/albums/services/albums.service';
import { ArtistsService } from 'src/artists/services/artists.service';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { TracksService } from 'src/tracks/services/tracks.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './services/favorites.service';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    InMemoryDBService,
    ArtistsService,
    AlbumsService,
    TracksService,
  ],
})
export class FavoritesModule {}
