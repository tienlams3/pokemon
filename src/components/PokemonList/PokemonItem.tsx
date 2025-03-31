import { IPokemon, IPokemonDetail } from "@/types/pokemon";

const DEFAULT_IMAGE = "/window.svg"; // Placeholder image path

async function fetchPokemon(url: string): Promise<IPokemonDetail | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch pokemon item!')
    return res.json();
  } catch (error) {
    console.error(error);
    return null; // Return null on failure to handle errors gracefully
  }
}

export default async function PokemonItem({ name, url }: IPokemon) {
  const item = await fetchPokemon(url);

  if (!item) {
    return (
      <div className="flex flex-col items-center justify-center h-56 p-2 bg-red-100 rounded-lg shadow">
        <h5 className="font-medium text-xl text-red-600">{name}</h5>
        <p className="text-sm text-red-500">Failed to load Pokémon details.</p>
      </div>
    );
  }

  const frontGif = item?.sprites?.other?.showdown?.front_default;
  const frontPng = item?.sprites?.front_default
  const img = frontGif ?? frontPng ?? DEFAULT_IMAGE;
  const baseUrl = process.env.POKEMON_BASE_URL + '/pokemon/'

  return (
    <div className="flex flex-col items-center justify-between h-56 p-2 bg-white rounded-lg shadow transition-shadow duration-300 hover:shadow-xl">
      <h5 className="font-medium text-xl capitalize">{name}</h5>
      <img src={img} alt={name} className="w-24 h-24 object-contain aspect-square" loading="lazy" />
      <p className="text-sm text-gray-600">Number: {url.replace(baseUrl, '').replace('/', '')}</p>
    </div>
  );
}
