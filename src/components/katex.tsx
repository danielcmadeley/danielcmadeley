'use client'

import 'katex/dist/katex.min.css'
import katex from 'katex'
import { useEffect, useRef } from 'react'

interface KatexProps {
  math: string
  display?: boolean
}

export function Katex({ math, display = false }: KatexProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      katex.render(math, containerRef.current, {
        displayMode: display,
        throwOnError: false,
      })
    }
  }, [math, display])

  return <div ref={containerRef} className="overflow-x-auto" />
}
