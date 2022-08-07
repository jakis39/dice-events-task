export function formatPrice(price: number) {
  return price === 0
    ? 'Free'
    : new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
      })
        .format(price / 100)
        .replace('.00', '');
}
