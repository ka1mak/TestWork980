export namespace LocalStorage {
  const isClientSide = (): boolean => {
    return typeof window === 'undefined'
  }

  export const get = <T = unknown>(key: string): T | null => {
    if (isClientSide()) return null
    const raw = localStorage.getItem(key)

    return raw ? (JSON.parse(raw) as T) : null
  }

  export const set = <T>(key: string, value: T): void => {
    if (isClientSide()) return
    localStorage.setItem(key, JSON.stringify(value))
  }

  export const remove = (key: string): void => {
    if (isClientSide()) return
    localStorage.removeItem(key)
  }
}
