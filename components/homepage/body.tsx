import React, { Suspense } from "react";
import HighlightProduct from "./highlight-product";
import { getProducts } from "@/utils/get-products";

const BodyHomepage: React.FC = async () => {
    const products = await getProducts(({ limit: 4 }));
    
    return (
        <main className="my-10">
            <HighlightProduct products={products?.products} />
        </main>
    )
}

export default BodyHomepage;