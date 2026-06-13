import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartItem, Item } from '../types';
import { mockProducts } from '../data/mockData';

interface CartState {
  items: CartItem[];
  addItem: (item: Item, quantity?: number) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
  getSubtotal: () => number;
  getTax: () => number;
  getTotal: () => number;
}

const TAX_RATE = 0.08;

const initialItems: CartItem[] = [
  { item: mockProducts[0], quantity: 1 },
  { item: mockProducts[4], quantity: 2 },
  { item: mockProducts[6], quantity: 1 },
];

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: initialItems,

      addItem: (item: Item, quantity = 1) => {
        const { items } = get();
        const existing = items.find(i => i.item.id === item.id);

        if (existing) {
          set({
            items: items.map(i =>
              i.item.id === item.id
                ? { ...i, quantity: i.quantity + quantity }
                : i,
            ),
          });
        } else {
          set({ items: [...items, { item, quantity }] });
        }
      },

      removeItem: (itemId: string) => {
        set({ items: get().items.filter(i => i.item.id !== itemId) });
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId);
          return;
        }
        set({
          items: get().items.map(i =>
            i.item.id === itemId ? { ...i, quantity } : i,
          ),
        });
      },

      clearCart: () => set({ items: [] }),

      getItemCount: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

      getSubtotal: () => get().items.reduce((sum, i) => sum + i.item.price * i.quantity, 0),

      getTax: () => get().getSubtotal() * TAX_RATE,

      getTotal: () => get().getSubtotal() + get().getTax(),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);
