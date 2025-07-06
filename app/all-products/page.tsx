import PaginationControls from "@/components/all-products/pagination";
import { SortDropdown } from "@/components/all-products/sort-dropdown";
import { Product } from "@/constant/product";
import { getProducts } from "@/utils/get-products";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import React, { Suspense, use } from "react";

export default async function Page({ searchParams }: { 
    searchParams: Promise<{ 
        [key: string]: string | string[] | undefined, 
        sort: "termurah" | "termahal" | "",
    }>;
})  {
    const page = parseInt((await searchParams).page as string) || 1;
    const sort = (await searchParams).sort || "";
    const limit = 8;

    const { products, total } = await getProducts({ page, limit, sort });
    const totalPages = Math.ceil(total / limit);
    
    return (
        <main className="container mx-auto my-10">
            <div className="mb-5 mx-5">
                <SortDropdown />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 md:gap-6 mx-5">
                {products && products.map((product: Product) => (
                    <Link
                        href={`/product/${product.id}`}
                        key={product.id}
                        className="bg-zinc-800 gap-5 p-4 flex flex-col items-center md:p-6 rounded-lg"
                    >
                        <div className="rounded-md w-full h-[200px] overflow-hidden">
                            <img
                                src={product.images[0]}
                                alt={product.title}
                                className="object-contain object-center h-full mx-auto"
                            />
                        </div>
                        <div className="flex-[1]">
                            <h4 className="text-zinc-300 font-semibold m-0">{product.title}</h4>
                            <p className="line-clamp-3 text-zinc-100/60 my-2 text-sm sm:text-md">{product.description}</p>
                            <span className="font-semibold">${product.price.toFixed(2)}</span>
                        </div>
                    </Link>
                ))}
            </div>
            <PaginationControls currentPage={page} totalPages={totalPages} />
        </main>
    );
};