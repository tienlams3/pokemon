import {
  IPokemon,
  IPokemonResponse,
  IPokemonTypeResponse,
} from "@/types/pokemon";
import pokemonApi from "../rest";
import { PAGE_SIZE } from "@/services/constants";

export async function fetchPokemonByOffset(
  offset: number = 0
): Promise<IPokemonResponse> {
  const params = new URLSearchParams({
    limit: PAGE_SIZE.toString(),
    offset: offset.toString(),
  });
  return pokemonApi(`/pokemon?${params}`);
}

export async function fetchPokemonByType(type: string): Promise<IPokemon[]> {
  const res: IPokemonTypeResponse = await pokemonApi(`/type/${type}`);
  return res.pokemon.map(({ pokemon }) => pokemon);
}

export async function fetchPokemonByTypes(
  types: string[],
  offset: number = 0
): Promise<IPokemonResponse> {
  const promises = types.map(fetchPokemonByType);
  const results = await Promise.all(promises);

  const list = results.flat();
  const uniquePokemons = getUniquePokemons(list, types.length);

  return {
    count: uniquePokemons.length,
    results: uniquePokemons.slice(offset, offset + PAGE_SIZE),
  };
}

function getUniquePokemons(list: IPokemon[], countTypes: number) {
  if (countTypes === 1) {
    return list;
  }
  const pokemonCounts = new Map<string, number>();
  const uniquePokemons = [];

  for (const pokemon of list) {
    const count = (pokemonCounts.get(pokemon.name) ?? 0) + 1;
    pokemonCounts.set(pokemon.name, count);

    if (count > 1) uniquePokemons.push(pokemon);
  }
  return uniquePokemons;
}
