'use client';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { useRouter, useSearchParams } from 'next/navigation';

export function SortDropdown() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSortChange: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sort', e.target.value);
    params.set('page', '1'); 
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="relative block w-fit">
      <select
        defaultValue={searchParams.get('sort') || ''}
        onChange={handleSortChange}
        className="mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white pr-8"
      >
        <option value="">Urutkan</option>
        <option value="termahal">Termahal</option>
        <option value="termurah">Termurah</option>
      </select>
      <ChevronDownIcon
        className="pointer-events-none absolute top-2.5 right-2.5 size-4"
        aria-hidden="true"
      />
    </div>
  );
}