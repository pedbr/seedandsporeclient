interface TranslationString {
  [key: string]: string
}

export interface ProductType {
  id: string
  createdAt: number
  name: TranslationString
  stock: number
  price: number
  imageUrl: string
  description: TranslationString
  available: boolean
  categoryId?: number
  campaignId?: number
  weight: number
}
