import { Product } from "@/constant/product";

export async function getProducts({
  search,
  page = 1,
  limit = 10,
  sort,
}: {
  search?: string;
  page?: number;
  limit?: number;
  sort?: "termurah" | "termahal" | "";
}) {
  let baseUrl = 'https://dummyjson.com/products';
  const params = new URLSearchParams();

  params.set('limit', limit.toString());
  params.set('skip', ((page - 1) * limit).toString());

  if (search) {
    baseUrl += '/search';
    params.set('q', search);
  }

  const url = `${baseUrl}?${params.toString()}`;

  const res = await fetch(url, {
    next: {
      revalidate: 60,
    },
  });

  const allProducts: {
    products: Product[];
    total: number;
    skip: number;
    limit: number;
  } = await res.json();

  if (sort === "termurah") {
    allProducts.products.sort((a, b) => a.price - b.price);
  } else if (sort === "termahal") {
    allProducts.products.sort((a, b) => b.price - a.price);
  }

  return {
    products: allProducts.products,
    total: allProducts.total,
    skip: allProducts.skip,
    limit: allProducts.limit,
  };
}