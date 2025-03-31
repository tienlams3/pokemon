import { IPokemonResponse } from "@/types/pokemon";
import pokemonApi from "@/services/api/rest";
import FilterButtonGroup from "./FilterButtonGroup";

interface IPokemonFiltersProps {
  count: number;
}

export async function getPokemonType(): Promise<IPokemonResponse> {
  return await pokemonApi.get("/type");
}

export default async function PokemonFilters({ count }: IPokemonFiltersProps) {
  const { results } = await getPokemonType();
  return (
    <div className="mt-10">
      <p>Total count: {count}</p>
      <div className="flex gap-3 mt-5 items-center flex-wrap">
        <span>Types: </span>
        <FilterButtonGroup types={results} />
      </div>
    </div>
  );
}
