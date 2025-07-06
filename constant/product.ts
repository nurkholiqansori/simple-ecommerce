export interface Product {
    id: string | number;
    title: string;
    description?: string;
    images: string[];
    price: number;
    category?: string;
    brand?: string;
    stock?:number;
}