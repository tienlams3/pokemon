"use client";

import { useEffect, useState } from "react";
import pokemonRestApi from "@/services/api/rest";
import { IPokemon, IPokemonDetail } from "@/types/pokemon";

const DEFAULT_IMAGE = "/window.svg"; // Placeholder image path

export default function PokemonItem({ name, url }: IPokemon) {
  const [item, setItem] = useState<IPokemonDetail | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchPokemon() {
      try {
        const path = url?.replace(
          process.env.NEXT_PUBLIC_POKEMON_BASE_URL ?? "",
          ""
        );
        const data: IPokemonDetail = await pokemonRestApi(path);
        setItem(data);
      } catch {
        setError(true);
      }
    }

    fetchPokemon();
  }, [url]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-56 p-2 bg-red-100 rounded-lg shadow">
        <h5 className="font-medium text-xl text-red-600">{name}</h5>
        <p className="text-sm text-red-500">Failed to load Pokémon details.</p>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-56 p-2 bg-gray-100 rounded-lg shadow">
        <h5 className="font-medium text-xl">{name}</h5>
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  const frontGif = item.sprites?.other?.showdown?.front_default;
  const frontPng = item.sprites?.front_default;
  const img = frontGif ?? frontPng ?? DEFAULT_IMAGE;
  const baseUrl = process.env.NEXT_PUBLIC_POKEMON_BASE_URL + "/pokemon/";

  return (
    <div className="flex flex-col items-center justify-between h-56 p-2 bg-white rounded-lg shadow transition-shadow duration-300 hover:shadow-xl">
      <h5 className="font-medium text-xl capitalize">{name}</h5>
      <img
        src={img}
        alt={name}
        className="w-24 h-24 object-contain aspect-square"
        loading="lazy"
      />
      <p className="text-sm text-gray-600">
        Number: {url.replace(baseUrl, "").replace("/", "")}
      </p>
    </div>
  );
}
