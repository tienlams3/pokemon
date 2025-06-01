"use client";
import { useRouter, useSearchParams } from "next/navigation";
import FilterButton from "./FilterButton";
import { IPokemon } from "@/types/pokemon";
import { useState } from "react";

interface IFilterButtonGroupProps {
  types: IPokemon[];
}

export default function FilterButtonGroup({ types }: IFilterButtonGroupProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");
  const [selectedTypes, setSelectedTypes] = useState(typeParam?.split(",") ?? []);

  const onFilterChanged = (name: string) => {
    const types = selectedTypes.includes(name) ? selectedTypes.filter(type => type != name) : [...selectedTypes, name];
    setSelectedTypes(types);

    const params = new URLSearchParams();
    params.append("page", '1');
    if (types.length > 0)
      params.append("type", types.join(","));

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
