import { Controller, Get, Param } from '@nestjs/common';
import { PokeApiService } from '../services/poke-api.service';

@Controller('api')
export class PokeApiController {
  constructor(private readonly pokeApiService: PokeApiService) {}

  @Get('pokemon')
  async getPokemons() {
    return this.pokeApiService.getPokemons();
  }

  @Get('pokemon/:id')
  async getPokemonById(@Param('id') pokemonId: string) {
    return this.pokeApiService.getPokemonById(pokemonId);
  }

  @Get('pokemonAndTypes/:id')
  async getPokemonAndTypes(@Param('id') pokemonId: string) {
    return this.pokeApiService.getPokemonAndTypes(pokemonId);
  }
}
