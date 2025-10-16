/**
 * Parse and normalize a page query parameter.
 * - Accepts only positive integers ("1", "2", ...). Any other input falls back to 1.
 * - Clamps to [1, totalPages] when totalPages is a positive finite number.
 */
export const pageParamParser = (page?: string, totalPages?: number) => {
  const max =
    typeof totalPages === 'number' &&
    Number.isFinite(totalPages) &&
    totalPages > 0
      ? Math.floor(totalPages)
      : undefined

  const trimmed = typeof page === 'string' ? page.trim() : ''
  const isPositiveIntString = /^[1-9]\d*$/.test(trimmed)
  const n = isPositiveIntString ? parseInt(trimmed, 10) : 1
  return max !== undefined ? Math.max(1, Math.min(n, max)) : Math.max(1, n)
}
