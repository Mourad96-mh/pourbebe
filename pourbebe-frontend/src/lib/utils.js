export function formatPrice(amount) {
  if (amount == null) return ''
  const parts = Number(amount).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '\u202F')
  return `${parts} DH`
}

export function slugify(str) {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

export function getDiscountPercent(price, compareAt) {
  if (!compareAt || compareAt <= price) return null
  return Math.round(((compareAt - price) / compareAt) * 100)
}

export function truncate(str, maxLength = 80) {
  if (!str) return ''
  return str.length > maxLength ? str.slice(0, maxLength).trimEnd() + '…' : str
}
