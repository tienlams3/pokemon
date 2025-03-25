import Pagination from "@/components/Pagination";
import PokemonFilters from "@/components/PokemonFilter";
import PokemonList from "@/components/PokemonList";
import { fetchPokemonByOffset, fetchPokemonByTypes } from "@/services/api/pokemon";
import { PAGE_SIZE } from "@/services/constants";
import { IPokemonResponse, } from "@/types/pokemon";

async function fetchPokemon(offset: number = 0, types: string[]): Promise<IPokemonResponse> {
  return types.length > 0 ? fetchPokemonByTypes(types, offset) : fetchPokemonByOffset(offset);
}

export default async function Home({ searchParams }: { searchParams: Record<string, string> }) {
  const params = await searchParams;
  const activePage = Number(params.page ?? '1');
  const activeTypes = params.type ? params.type.split(",") : [];
  const offset = (activePage - 1) * PAGE_SIZE;

  const { count, results } = await fetchPokemon(offset, activeTypes);

  return (
    <main className="w-full h-full max-w-[1920px] mx-auto p-7">
      <h1 className="text-center">Welcome to Pokemon World</h1>
      <PokemonFilters count={count} />
      <PokemonList list={results} />
      {count > PAGE_SIZE && (
        <Pagination page={activePage} totalPage={Math.ceil(count / PAGE_SIZE)} />
      )}
    </main>
  );
}
