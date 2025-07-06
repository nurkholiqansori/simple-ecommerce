import { Product } from "@/constant/product";
import Link from "next/link";
import React, { useMemo } from "react";

type HighlightProductProps = {
    products: Product[];
};

const HighlightProduct: React.FC<HighlightProductProps> = ({ products }) => {
    if (!products || products.length === 0) return null;

    const [bigProduct, ...otherProducts] = useMemo(() => {
        const shuffled = [...products].sort(() => Math.random() - 0.5);
        return shuffled;
    }, [products]);

    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 mx-5">
                <div className="flex-1 md:flex-1/2">
                    <h1 className="font-black text-2xl mb-10">Produk untukmu</h1>
                
                    <Link
                        href={`/product/${bigProduct.id}`}
                        className="bg-zinc-800 flex items-center flex-col p-4 md:p-6 rounded-lg"
                    >
                        <img
                            src={bigProduct.images[0]}
                            alt={bigProduct.title}
                            className="object-cover border-md max-h-[300px]"
                        />
                        <h2 className="mt-4 mb-2 text-zinc-300 font-semibold m-0">{bigProduct.title}</h2>
                        <p className="text-zinc-100/60 my-2">{bigProduct.description}</p>
                        <strong className="font-semibold">${bigProduct.price.toFixed(2)}</strong>
                    </Link>
                </div>

                <div className="flex-1 md:flex-1/2 flex flex-col gap-5">
                    {otherProducts.slice(0, 3).map((product) => (
                        <Link
                            href={`/product/${product.id}`}
                            key={product.id}
                            className="bg-zinc-800 gap-8 p-4 flex flex-col md:flex-row items-center md:p-6 rounded-lg"
                        >
                            <div className="rounded-md md:w-1/3 max-h-[300px] md:max-h-[150px] overflow-hidden">
                                <img
                                    src={product.images[0]}
                                    alt={product.title}
                                    className="object-cover object-center h-full"
                                />
                            </div>
                            <div className="flex-[1]">
                                <h4 className="text-zinc-300 font-semibold m-0">{product.title}</h4>
                                <p className="line-clamp-3 text-zinc-100/60 my-2">{product.description}</p>
                                <span className="font-semibold">${product.price.toFixed(2)}</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
};

export default HighlightProduct;