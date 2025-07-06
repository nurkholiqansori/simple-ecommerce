'use client';

import { addToCart } from "@/lib/cart";

export default function AddToCartButton({ product }: { product: any }) {
  return (
    <button
      onClick={() => {
        addToCart({
          id: product.id,
          title: product.title,
          price: product.price,
          image: product.thumbnail || product.images?.[0],
          quantity: 1,
        });
        alert('Added to cart!');
      }}
      className="relative mt-5 text-white/50 p-3 border border-zinc-300/50 focus:border-zinc-300 hover:border-zinc-300 rounded-md focus:text-white hover:text-white cursor-pointer"
    >
      Tambah ke keranjang
    </button>
  );
}