import React, { useEffect, useState } from 'react'

export function useScroll() {
  const [scroll, setScroll] = useState({ x: 0, y: 0 })

  function setScrollSize() {
    setScroll({ x: window.scrollX, y: window.scrollY })
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', setScrollSize)
    }

    return () => window.removeEventListener('scroll', setScrollSize)
  }, [])

  return [scroll]
}
