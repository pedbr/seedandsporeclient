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

const formatNumber = (number: number): number => {
  const formattedNumberString = number.toFixed(2)
  const formattedNumber = parseFloat(formattedNumberString)
  return formattedNumber
}

export const getActualPrice = (price: number, discount: number) => {
  if (!price) return 0
  if (discount > 0) {
    const discountedPrice = price * (1 - discount / 100)
    return formatNumber(discountedPrice)
  }
  return price
}

export const formatNumberToTwoDecimalString = (number: number): string => {
  if (!number) return '0'
  return Number(number).toFixed(2)
}
