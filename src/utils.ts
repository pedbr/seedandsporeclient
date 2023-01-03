export const getShippingCost = (
  cartTotalWeight: number,
  cartTotalPrice: number
): number => {
  if (cartTotalPrice > 49) return 0
  if (cartTotalWeight === 0) return 0
  if (cartTotalWeight < 3000) return 7
  if (cartTotalWeight < 9000) return 9
  if (cartTotalWeight < 12000) return 13
  if (cartTotalWeight >= 12000) return 20
  return 0
}

// - Up to 3kg -> 7EUR
// - Up to 9kg -> 9EUR
// - Up to 12kg -> 13EUR
// - > 12kg -> 20EUR
// - Free above 50EUR
