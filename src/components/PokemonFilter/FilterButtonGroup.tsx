"use client";
import { useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";
import { IPokemon } from "@/types/pokemon";

interface IFilterButtonGroupProps {
  types: IPokemon[];
}

export default function FilterButtonGroup({ types }: IFilterButtonGroupProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const selectedTypes = typeParam?.split(",") ?? [];

  const onFilterChanged = (name: string) => {
    const updatedTypes = new Set(selectedTypes);

    if (updatedTypes.has(name)) {
      updatedTypes.delete(name);
    } else {
      updatedTypes.add(name);
    }

    const params = new URLSearchParams();
    params.append("page", '1');
    if (updatedTypes.size > 0)
      params.append("type", Array.from(updatedTypes).join(","));

    router.push(`/?${params}`);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {types.map(({ name }) => (
        <FilterButton
          key={name}
          name={name}
          active={selectedTypes.includes(name)}
          onClick={onFilterChanged}
        />
      ))}
    </div>
  );
}
