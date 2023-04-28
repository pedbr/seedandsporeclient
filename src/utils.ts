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
