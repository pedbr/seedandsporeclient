import create from 'zustand'
import { persist } from 'zustand/middleware'

import { CartItem } from './types/cartItem'

interface Store {
  itemsInCart: number
  cartItems: CartItem[]
  cartTotalPrice: number
  resetCart: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
}

const useStore = create(
  persist<Store>(
    (set, get) => ({
      itemsInCart: 0,
      cartItems: [],
      cartTotalPrice: 0,
      resetCart: () =>
        set({ itemsInCart: 0, cartItems: [], cartTotalPrice: 0 }),
      addToCart: (item) =>
        set(() => {
          const existingItem = get().cartItems.find(
            (cartItem) => cartItem.id === item.id
          )
          if (existingItem) {
            existingItem.quantity = existingItem.quantity + item.quantity
            return {
              cartItems: [
                ...get().cartItems.filter(
                  (cartItem) => cartItem.id !== item.id
                ),
                existingItem,
              ],
              itemsInCart: get().itemsInCart + item.quantity,
              cartTotalPrice: get().cartTotalPrice + item.price * item.quantity,
            }
          }
          return {
            cartItems: [...get().cartItems, item],
            itemsInCart: get().itemsInCart + item.quantity,
            cartTotalPrice: get().cartTotalPrice + item.price * item.quantity,
          }
        }),
      removeFromCart: (item) =>
        set({
          cartItems: get().cartItems.filter(
            (cartItem) => cartItem.id !== item.id
          ),
          itemsInCart: get().itemsInCart - item.quantity,
          cartTotalPrice: get().cartTotalPrice - item.price * item.quantity,
        }),
    }),
    {
      name: 'seed-spore',
    }
  )
)

export default useStore
