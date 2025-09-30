import { useRef, useEffect } from 'react'

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current ?? undefined
}

export default usePrevious
