'use client';

import { useRouter, useSearchParams } from 'next/navigation';

export default function PaginationControls({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => {
        const pageNum = i + 1;
        const isActive = currentPage === pageNum;
        return (
          <button
            key={pageNum}
            onClick={() => handlePageChange(pageNum)}
            className={`px-3 py-1 border rounded cursor-pointer transition ${
              isActive
                ? 'bg-transparent text-zinc-200 border-zinc-400'
                : 'bg-zinc-500/60 hover:bg-zinc-500 text-zinc-900 border-transparent'
            }`}
          >
            {pageNum}
          </button>
        );
      })}
    </div>
  );
}