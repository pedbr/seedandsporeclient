import { ProductType } from './products'

type Status =
  | 'processing'
  | 'pending'
  | 'preparing'
  | 'expedited'
  | 'delivered'
  | 'closed'

export interface OrderType {
  id: string
  createdAt: string
  status: Status
  products: ProductType
  totalPrice: number
}
