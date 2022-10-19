export interface ProductType {
  id: string
  createdAt: number
  name: string
  stock: number
  price: number
  imageUrl: string
  description: string
  available: boolean
  categoryId?: number
  campaignId?: number
}
