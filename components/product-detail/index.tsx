"use client"

import getProductDetail from "@/lib/product-detail";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";
import AddToCartButton from "./button";
import { Product } from "@/constant/product";

export function ProductDetailPage({ id }: { id: string }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [mainImage, setMainImage] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      const data = await getProductDetail(id);
      if (!data) return notFound();
      setProduct(data);
      setMainImage(data.thumbnail || data.images?.[0]);
    }

    fetchData();
  }, [id]);

  if (!product) return <div className="text-white p-10">Loading...</div>;

  return (
    <main className="container mx-auto py-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="w-full">
          <Image
            src={mainImage}
            alt={product.title}
            width={600}
            height={600}
            className="rounded-lg object-cover w-full h-auto"
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {product.images?.map((img: string, i: number) => (
              <Image
                key={i}
                src={img}
                alt={`${product.title}-${i}`}
                width={80}
                height={80}
                className="rounded-md object-cover border border-white/10 cursor-pointer hover:ring-2 ring-blue-400"
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-white">{product.title}</h1>
          <p className="text-zinc-300 mt-2">{product.description}</p>
          <p className="text-zinc-400 text-sm mt-1">Kategori: {product.category}</p>
          <p className="text-zinc-400 text-sm">Brand: {product.brand}</p>
          <p className="text-zinc-100 font-semibold text-lg mt-4">${product.price.toFixed(2)}</p>
          <p className="text-sm text-green-400 mt-1">Stok: {product.stock}</p>

          <AddToCartButton product={product} />
        </div>
      </div>
    </main>
  );
}