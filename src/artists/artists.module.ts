import { Module } from '@nestjs/common';
import { InMemoryDBService } from 'src/providers/database/inmemory/inmemory-db.service';
import { ArtistsController } from './artists.controller';
import { ArtistsService } from './services/artists.service';

@Module({
  controllers: [ArtistsController],
  providers: [ArtistsService, InMemoryDBService],
})
export class ArtistsModule {}
