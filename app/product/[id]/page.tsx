import { ProductDetailPage } from "@/components/product-detail";

export default async function ProductDetailPageWrapper({ params }: { params: Promise<{ id: string }> }) {
  return <ProductDetailPage id={(await params).id} />;
}
