// utils/cart.ts

export interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const CART_KEY = 'cart_items';

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

export function saveCart(cart: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(cart));

  // Emit custom event agar komponen lain bisa dengar
  window.dispatchEvent(new CustomEvent('cartUpdated'));
}

export function addToCart(item: CartItem) {
  const cart = getCart();
  const existing = cart.find(p => p.id === item.id);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }
  saveCart(cart);
}

export function removeFromCart(id: number) {
  const cart = getCart().filter(p => p.id !== id);
  saveCart(cart);
}

export function clearCart() {
  saveCart([]);
}