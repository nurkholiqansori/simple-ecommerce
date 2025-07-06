'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CartItem } from '@/lib/cart';

export default function CheckoutPage() {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const stored = localStorage.getItem('cart_items');
        const items: CartItem[] = stored ? JSON.parse(stored) : [];
        setCartItems(items);
        const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        setTotalPrice(total);
    }, []);

    if (cartItems.length === 0) {
        return (
            <main className="p-8 text-center text-zinc-400">
                <h1 className="text-xl font-semibold mb-4">Keranjang Kosong</h1>
                <Link href="/" className="text-blue-500 hover:underline">
                    Kembali ke Belanja
                </Link>
            </main>
        );
    }

    return (
        <main className="container mx-auto p-8">
            <h1 className="text-2xl font-bold mb-6 text-white">Checkout</h1>

            <div className="space-y-4">
                {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-white/10 pb-4">
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-16 h-16 object-cover rounded border border-white/10"
                        />
                        <div className="flex-1">
                            <Link href={`/product/${item.id}`}>
                                <h2 className="text-white/80 font-semibold hover:text-white">{item.title}</h2>
                            </Link>
                            <p className="text-zinc-300 text-sm">
                                Qty: {item.quantity} x ${item.price.toLocaleString()}
                            </p>
                        </div>
                        <div className="font-bold text-white">
                            ${(item.quantity * item.price).toLocaleString()}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-right">
                <p className="text-white font-semibold text-lg">
                    Total: ${totalPrice.toLocaleString()}
                </p>
                <button
                    onClick={() => alert('Proses checkout!')}
                    className="relative text-white/50 p-3 border mt-5 border-zinc-300/50 focus:border-zinc-300 hover:border-zinc-300 rounded-md focus:text-white hover:text-white cursor-pointer"
                >
                    Bayar Sekarang
                </button>
            </div>
        </main>
    );
}