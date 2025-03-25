export interface IPokemonResponse {
  results: IPokemon[];
  count: number;
}

export interface IPokemon {
  name: string;
  url: string;
}

export interface IPokemonTypeResponse {
  pokemon: IPokemonType[];
}

export interface IPokemonType {
  pokemon: IPokemon;
  slot: number;
}

export interface IPokemonDetail {
  sprites: {
    front_default: string;
    other: {
      showdown: {
        front_default: string;
      };
    };
  };
}
