import { useRef, useEffect } from 'react'

export const useScrollStatus = (setShowNext: (show: boolean) => void) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) return

    if (ref.current.scrollWidth > ref.current.clientWidth) {
      // scrollbar occur
      setShowNext(true)
    }
  }, [setShowNext])

  useEffect(() => {
    if (!ref.current) return

    const refEle = ref.current
    const handleScroll: EventListener = () => {
      if (refEle.offsetWidth + refEle.scrollLeft >= refEle.scrollWidth) {
        // scroll to end
        setShowNext(false)
      } else {
        setShowNext(true)
      }
    }

    refEle.addEventListener('scroll', handleScroll)

    return () => {
      refEle.removeEventListener('scroll', handleScroll)
    }
  }, [setShowNext])

  return ref
}
