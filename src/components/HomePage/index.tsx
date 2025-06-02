"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Pagination from "@/components/Pagination";
import PokemonFilters from "@/components/PokemonFilter";
import PokemonList from "@/components/PokemonList";
import {
  fetchPokemonByOffset,
  fetchPokemonByTypes,
} from "@/services/api/pokemon";
import { PAGE_SIZE } from "@/services/constants";
import { IPokemonResponse } from "@/types/pokemon";

export default function HomePage() {
  const searchParams = useSearchParams();
  const [pokemonData, setPokemonData] = useState<IPokemonResponse | null>(null);
  const activePage = useMemo(
    () => Number(searchParams.get("page") ?? "1"),
    [searchParams]
  );

  useEffect(() => {
    const activeTypes = searchParams.get("type")?.split(",") ?? [];
    const offset = (activePage - 1) * PAGE_SIZE;
    async function fetchData() {
      const data =
        activeTypes.length > 0
          ? await fetchPokemonByTypes(activeTypes, offset)
          : await fetchPokemonByOffset(offset);
      setPokemonData(data);
    }

    fetchData();
  }, [activePage, searchParams]);

  return (
    <main className="w-full h-full max-w-[1920px] mx-auto p-7">
      <h1 className="text-center">Welcome to Pokemon World</h1>

      {/* Show loading or error state until data is fetched */}
      {!pokemonData ? (
        <p className="text-center mt-4">Loading...</p>
      ) : (
        <>
          <PokemonFilters count={pokemonData.count} />
          <PokemonList list={pokemonData.results} />
          {pokemonData.count > PAGE_SIZE && (
            <Suspense fallback={<div>Loading...</div>}>
              <Pagination
                page={activePage}
                totalPage={Math.ceil(pokemonData.count / PAGE_SIZE)}
              />
            </Suspense>
          )}
        </>
      )}
    </main>
  );
}
