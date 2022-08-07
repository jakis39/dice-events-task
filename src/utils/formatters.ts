export function formatPrice(price: number, currency: string = 'GBP') {
  return price === 0
    ? 'Free'
    : new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency,
      })
        .format(price / 100)
        .replace('.00', '');
}
