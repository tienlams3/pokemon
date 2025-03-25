import { IPokemon } from "@/types/pokemon";
import PokemonItem from "./PokemonItem";

interface IPokemonListProps {
  list: IPokemon[];
}

export default function PokemonList({ list }: IPokemonListProps) {
  if (list.length === 0) return <div className='w-full h-56 flex items-center justify-center text-gray-600'>Empty data</div>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-10">
      {list.map((item) => (
        <PokemonItem key={item.name} {...item} />
      ))}
    </div>
  );
}
