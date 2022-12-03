import create from 'zustand'
import { persist } from 'zustand/middleware'

import { CartItem } from './types/cartItem'
import { OrderType } from './types/orders'

type Theme = 'light' | 'dark'

interface Store {
  theme: Theme
  setTheme: (newTheme: Theme) => void
  itemsInCart: number
  cartItems: CartItem[]
  cartTotalPrice: number
  currentOrder: OrderType | null
  orderFullName: string | null
  orderEmail: string | null
  orderPhoneNumber: string | null
  orderDeliveryAddress: string | null
  orderDeliveryPostCode: string | null
  orderDeliveryLocation: string | null
  orderBillingAddress: string | null
  resetCart: () => void
  addToCart: (item: CartItem) => void
  removeFromCart: (item: CartItem) => void
  setCurrentOrder: (order: OrderType) => void
  setOrderFullName: (value: string) => void
  setOrderEmail: (value: string) => void
  setOrderPhoneNumber: (value: string) => void
  setOrderDeliveryAddress: (value: string) => void
  setOrderDeliveryPostCode: (value: string) => void
  setOrderDeliveryLocation: (value: string) => void
  setOrderBillingAddress: (value: string) => void
}

const useStore = create(
  persist<Store>(
    (set, get) => ({
      theme: 'light',
      itemsInCart: 0,
      cartItems: [],
      cartTotalPrice: 0,
      currentOrder: null,
      orderFullName: null,
      orderEmail: null,
      orderPhoneNumber: null,
      orderDeliveryAddress: null,
      orderDeliveryPostCode: null,
      orderDeliveryLocation: null,
      orderBillingAddress: null,
      setTheme: (newTheme) => set({ theme: newTheme }),
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
      setCurrentOrder: (order) => set({ currentOrder: order }),
      setOrderFullName: (value) => set({ orderFullName: value }),
      setOrderEmail: (value) => set({ orderEmail: value }),
      setOrderPhoneNumber: (value) => set({ orderPhoneNumber: value }),
      setOrderDeliveryAddress: (value) => set({ orderDeliveryAddress: value }),
      setOrderDeliveryPostCode: (value) =>
        set({ orderDeliveryPostCode: value }),
      setOrderDeliveryLocation: (value) =>
        set({ orderDeliveryLocation: value }),
      setOrderBillingAddress: (value) => set({ orderBillingAddress: value }),
    }),
    {
      name: 'seed-spore',
    }
  )
)

export default useStore
