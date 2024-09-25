import { Module } from '@nestjs/common';
import { PokeApiController } from './poke-api.controller';
import { ServicesModule } from '../services/services.module';

@Module({
  imports: [ServicesModule],
  controllers: [PokeApiController],
})
export class ControllersModule {}
