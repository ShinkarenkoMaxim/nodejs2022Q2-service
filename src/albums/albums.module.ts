import { Module } from '@nestjs/common';
import { ArtistsService } from 'src/artists/services/artists.service';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { AlbumsController } from './albums.controller';
import { AlbumsService } from './services/albums.service';

@Module({
  controllers: [AlbumsController],
  providers: [AlbumsService, ArtistsService, InMemoryDBService],
})
export class AlbumsModule {}
