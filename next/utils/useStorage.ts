export default function useStorage<T extends object>(key: string) {
  const setItem = (value: T) => {
    localStorage.setItem(key, JSON.stringify(value))
  }

  const getItem = (): T | null => {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  }

  const removeItem = () => {
    localStorage.removeItem(key)
  }

  return { setItem, getItem, removeItem }
}
