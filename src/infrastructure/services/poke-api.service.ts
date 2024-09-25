import { Injectable } from '@nestjs/common';
import {
  Pokemon,
  PokemonsBasicData,
  PokemonWithTypesResponse,
  Result,
  TypeElement,
  TypeResponse,
} from 'src/domain/models/pokemon.model';
import { FetchHttpService } from './fetch-http-service.service';

@Injectable()
export class PokeApiService {
  private readonly pokeApiBaseUrl = process.env.POOKE_API_URL;

  constructor(private readonly fetchHttpServices: FetchHttpService) {}

  /**
   * Returns a list of the first 100 pokemons available in the PokeAPI.
   * @returns {Promise<{ results: Result[] }>} A Promise that resolves to an object with a results property that contains an array of Result objects.
   */
  async getPokemons(): Promise<{ results: Result[] }> {
    const pokemons: PokemonsBasicData =
      await this.fetchHttpServices.fetchGetExternalService(
        `${this.pokeApiBaseUrl}/pokemon?limit=100`,
      );

    return { results: pokemons.results };
  }

  /**
   * Retrieves a Pokemon by its ID from the PokeAPI.
   * @param {string} pokemonId - The ID of the Pokemon to retrieve.
   * @returns {Promise<PokemonWithTypesResponse>} A Promise that resolves to an object containing the name and types of the Pokemon.
   */
  async getPokemonById(pokemonId: string): Promise<PokemonWithTypesResponse> {
    const { name, types }: PokemonWithTypesResponse =
      await this.fetchHttpServices.fetchGetExternalService(
        `${this.pokeApiBaseUrl}/pokemon/${pokemonId}`,
      );

    return {
      name,
      types,
    };
  }

  /**
   * Retrieves a Pokemon by its ID along with its types from the PokeAPI.
   *
   * @param {string} pokemonId - The ID of the Pokemon to retrieve.
   * @returns {Promise<PokemonWithTypesResponse>} A Promise that resolves to an object containing the name and types of the Pokemon, including localized type names in Spanish or Japanese.
   */
  async getPokemonAndTypes(
    pokemonId: string,
  ): Promise<PokemonWithTypesResponse> {
    const { name, types }: Pokemon =
      await this.fetchHttpServices.fetchGetExternalService(
        `${this.pokeApiBaseUrl}/pokemon/${pokemonId}`,
      );

    const typeUrls = types.map(({ type }) => type.url);

    const typeNamesArray: TypeResponse[] = await Promise.all(
      typeUrls.map((url: string) =>
        this.fetchHttpServices.fetchGetExternalService(url),
      ),
    );

    const filteredTypeNamesArray = typeNamesArray.map((typeNames) =>
      typeNames.names.filter(
        (name) => name.language.name === 'es' || name.language.name === 'ja',
      ),
    );

    const typesWithNames = types.map((typeObj: TypeElement, index: number) => ({
      ...typeObj,
      type: {
        ...typeObj.type,
        names: filteredTypeNamesArray[index],
      },
    }));

    return {
      name,
      types: typesWithNames,
    };
  }
}
