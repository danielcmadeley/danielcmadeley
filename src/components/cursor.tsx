'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (cursorRef.current) {
      gsap.to(cursorRef.current, {
        opacity: 0,
        duration: 0.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }
  }, [])

  return <div ref={cursorRef} className="w-3 h-6 bg-neutral-400" aria-hidden="true" />
}
