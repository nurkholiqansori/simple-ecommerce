'use client';

import { removeFromCart } from '@/lib/cart';
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage
  const loadCart = () => {
    const stored = localStorage.getItem('cart_items');
    if (stored) {
      setCartItems(JSON.parse(stored));
    } else {
      setCartItems([]);
    }
  };

  useEffect(() => {
  const loadCart = () => {
    const stored = localStorage.getItem('cart_items');
    setCartItems(stored ? JSON.parse(stored) : []);
  };

  loadCart();

  const onCartUpdated = () => loadCart();

  window.addEventListener('cartUpdated', onCartUpdated);

  return () => {
    window.removeEventListener('cartUpdated', onCartUpdated);
  };
}, []);

  const removeItem = (id: number) => {
    removeFromCart(id);
  };
  

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Menu as="div" className="relative">
      <MenuButton
        aria-label="Cart"
        className="relative text-white/50 p-3 border border-zinc-300/50 focus:border-zinc-300 hover:border-zinc-300 rounded-md focus:text-white hover:text-white cursor-pointer"
      >
        <ShoppingBagIcon className="h-4" />
        {totalQuantity > 0 && (
          <div className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded-sm bg-emerald-600 text-[11px] font-medium text-white flex items-center justify-center">
            {totalQuantity}
          </div>
        )}
      </MenuButton>

      <MenuItems
        anchor="bottom end"
        className="w-3/4 !max-w-[400px] origin-top-right rounded-xl border border-white/5 bg-zinc-800 p-3 mt-2 text-sm/6 text-white transition duration-100 ease-out z-10 space-y-2"
      >
        {cartItems.length === 0 ? (
          <div className="text-center text-zinc-400">Cart is empty</div>
        ) : (
          cartItems.map((item) => (
            <MenuItem key={item.id} disabled>
              <div className="flex items-center gap-3 relative group">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 rounded object-cover border border-white/10"
                />
                <div className="flex-1">
                  <p className="font-semibold text-white text-sm line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-zinc-300">
                    Qty: {item.quantity} | Rp {(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
                <button
                  onClick={() => removeItem(item.id)}
                  className="absolute top-0 right-0 text-red-500 hover:text-red-300"
                  title="Hapus"
                >
                  <XMarkIcon className="h-4" />
                </button>
              </div>
            </MenuItem>
          ))
        )}
        
        <div className="my-3 h-px bg-white/5" />
        <div className='mt-5 mb-3'>
            <Link href="/checkout" className='relative text-white/50 p-3 border border-zinc-300/50 focus:border-zinc-300 hover:border-zinc-300 rounded-md focus:text-white hover:text-white cursor-pointer'>
                Checkout
            </Link>
        </div>
      </MenuItems>
    </Menu>
  );
};

export default Cart;