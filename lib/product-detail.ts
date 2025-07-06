export default async function getProductDetail(id: string) {
  const res = await fetch(`https://dummyjson.com/products/${id}`);

  if (!res.ok) return null;
  return await res.json();
}