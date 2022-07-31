import { Module } from '@nestjs/common';
import { FavoritesService } from 'src/favorites/services/favorites.service';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService, FavoritesService, InMemoryDBService],
})
export class TracksModule {}
