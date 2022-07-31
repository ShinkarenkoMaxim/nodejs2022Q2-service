import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/albums/services/albums.service';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { TracksService } from 'src/tracks/services/tracks.service';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './services/artists.service';
import { FavoritesService } from 'src/favorites/services/favorites.service';

@Module({
  controllers: [ArtistsController],
  providers: [
    ArtistsService,
    AlbumsService,
    TracksService,
    FavoritesService,
    InMemoryDBService,
  ],
})
export class ArtistsModule {}
