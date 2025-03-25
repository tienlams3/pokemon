"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

interface IPagination {
  page: number;
  totalPage: number;
}

export default function Pagination({ totalPage, page }: IPagination) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const onPageChanged = useCallback(
    (newPage: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", newPage.toString());
      router.push(`/?${params.toString()}`);
    },
    [router, searchParams]
  );

  return (
    <div className="flex items-center justify-center gap-4 p-4 mt-10">
      <button
        onClick={() => onPageChanged(page - 1)}
        disabled={page <= 1}
        className="px-4 py-2 rounded bg-gray-300 text-gray-700 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      <span className="text-md font-medium">Page {page} of {totalPage}</span>
      <button
        onClick={() => onPageChanged(page + 1)}
        disabled={page >= totalPage}
        className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
}
