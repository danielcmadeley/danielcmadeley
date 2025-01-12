'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

interface TextScrambleProps {
  messages: string[]
}

export function TextScramble({ messages }: TextScrambleProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [displayText, setDisplayText] = useState('')
  const elementRef = useRef<HTMLDivElement>(null)
  const queueRef = useRef<number[]>([])
  const frameRequestRef = useRef<number | undefined>(undefined)
  const chars = '!<>-_\\/[]{}—=+*^?#________'

  useEffect(() => {
    let isMounted = true
    const message = messages[currentIndex]

    const update = () => {
      if (!isMounted) return

      let output = ''
      let complete = 0

      for (let i = 0, n = message.length; i < n; i++) {
        const char = message[i]
        if (i < queueRef.current[i]) {
          complete++
        }

        if (queueRef.current[i] === 1) {
          output += char
        } else if (queueRef.current[i] > 0) {
          output += chars[Math.floor(Math.random() * chars.length)]
        } else {
          output += ''
        }
      }

      setDisplayText(output)

      if (complete === message.length) {
        gsap.delayedCall(1, () => {
          if (isMounted) {
            setCurrentIndex((prev) => (prev + 1) % messages.length)
          }
        })
        return
      }

      frameRequestRef.current = requestAnimationFrame(update)
    }

    // Initialize queue
    queueRef.current = new Array(message.length).fill(0)

    // Update queue
    const updateQueue = () => {
      if (!isMounted) return

      for (let i = 0, n = message.length; i < n; i++) {
        if (queueRef.current[i] === 0) {
          if (Math.random() < 0.1) {
            queueRef.current[i] = 1
          }
        }
      }

      // Force complete after a certain time
      if (frameRequestRef.current && frameRequestRef.current > 20) {
        queueRef.current = new Array(message.length).fill(1)
      }
    }

    // Start animation
    gsap.ticker.add(updateQueue)
    frameRequestRef.current = requestAnimationFrame(update)

    // Cleanup
    return () => {
      isMounted = false
      gsap.ticker.remove(updateQueue)
      if (frameRequestRef.current) {
        cancelAnimationFrame(frameRequestRef.current)
      }
    }
  }, [currentIndex, messages])

  return (
    <div ref={elementRef} className="min-h-[1.5em] text-lg md:text-xl" aria-live="polite">
      {displayText}
    </div>
  )
}
