import { Module } from '@nestjs/common';
import { AlbumsService } from 'src/albums/services/albums.service';
import { ArtistsService } from 'src/artists/services/artists.service';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';

@Module({
  controllers: [TracksController],
  providers: [TracksService, ArtistsService, AlbumsService, InMemoryDBService],
})
export class TracksModule {}
