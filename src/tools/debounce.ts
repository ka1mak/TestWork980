export function debounce<
  // eslint-disable-next-line no-unused-vars
  F extends (...args: any[]) => unknown
>(fn: F, delay = 300) {
  let timer: ReturnType<typeof setTimeout> | null = null

  return (...args: Parameters<F>): void => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
