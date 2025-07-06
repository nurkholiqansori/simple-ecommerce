"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchParams } from "next/navigation"

export default function SearchBox({actionCloseSearch = () => {}} : {
    actionCloseSearch?: () => void
}) {
    const searchParams = useSearchParams()
    
    return (
        <>
            <form action="/search" className="lg:w-max-[550px] min-h-10 relative w-full lg:w-80 xl:w-full h-full flex z-20">
                <input 
                    type="text" 
                    key={searchParams?.get('s')}
                    name="s"
                    placeholder="Cari Produk..."
                    autoComplete="off"
                    defaultValue={searchParams?.get('s') || ''}
                    className="bg-transparent border-zinc-300/50 border-b-2 px-4 py-2 outline-0 focus:border-zinc-300 block w-full mr-10"
                />

                <div className="absolute right-0 top-1/2 -translate-y-1/2 px-3 py-2 flex h-full items-center md:hidden cursor-pointer text-white/50 hover:text-white" onClick={actionCloseSearch}>
                    <XMarkIcon className="h-4 stroke-3" />
                </div>
            </form>
        </>
    )
}

export function SearchBoxSkeleton() {
    return (
        <div role="presentation" className="w-max-[550px] relative w-full lg:w-80 xl:w-full bg-zinc-400 p-4 animate-pulse rounded-md z-20"></div>
    )
}