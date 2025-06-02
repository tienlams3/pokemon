"use client";

import { Suspense, useEffect, useState } from "react";
import { IPokemon, IPokemonResponse } from "@/types/pokemon";
import pokemonApi from "@/services/api/rest";
import FilterButtonGroup from "./FilterButtonGroup";

interface IPokemonFiltersProps {
  count: number;
}

export default function PokemonFilters({ count }: IPokemonFiltersProps) {
  const [types, setTypes] = useState<IPokemon[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTypes() {
      try {
        const { results }: IPokemonResponse = await pokemonApi("/type");
        setTypes(results);
      } catch (err) {
        console.error("Failed to fetch types", err);
      } finally {
        setLoading(false);
      }
    }

    fetchTypes();
  }, []);

  return (
    <div className="mt-10">
      <p>Total count: {count}</p>
      <div className="flex gap-3 mt-5 items-center flex-wrap">
        <span>Types: </span>
        {loading ? (
          <span>Loading types...</span>
        ) : (
          <Suspense fallback={<div>Loading...</div>}>
            <FilterButtonGroup types={types} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
