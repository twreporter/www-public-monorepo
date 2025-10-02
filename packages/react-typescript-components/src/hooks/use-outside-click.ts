import { useRef, useEffect } from 'react'

function useOutsideClick<T extends HTMLElement = HTMLElement>(
  callback: (event: MouseEvent) => void
) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return // SSR safety

    const handleClick = (event: MouseEvent) => {
      if (typeof callback !== 'function') return
      const el = ref.current
      if (!el) return
      const target = event.target
      if (target instanceof Node && !el.contains(target)) {
        callback(event)
      }
    }

    // to work with react synthetic events, we need to add event handler on window instead of document
    // ref: https://dev.to/dvnrsn/why-isn-t-event-stoppropagation-working-1bnm
    window.addEventListener('click', handleClick, { capture: true })
    return () => {
      window.removeEventListener('click', handleClick, { capture: true })
    }
  }, [callback])

  return ref
}

export default useOutsideClick
