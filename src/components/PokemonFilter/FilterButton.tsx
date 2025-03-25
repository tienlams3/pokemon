interface IFilterButtonProps {
  name: string;
  active: boolean;
  onClick: (type: string) => void;
}

export default function FilterButton({
  name,
  active,
  onClick,
}: IFilterButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onClick(name)}
      className={`border px-4 py-2 rounded transition cursor-pointer 
        ${
          active
            ? "bg-blue-400 border-blue-400 text-white hover:bg-blue-500"
            : "border-gray-500 hover:bg-gray-500 hover:text-white"
        }`}
    >
      {name}
    </button>
  );
}
