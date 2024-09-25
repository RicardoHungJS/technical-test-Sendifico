import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { FetchHttpService } from './fetch-http-service.service';
import { PokeApiService } from './poke-api.service';

@Module({
  imports: [HttpModule],
  providers: [PokeApiService, FetchHttpService],
  exports: [PokeApiService, FetchHttpService],
})
export class ServicesModule {}
