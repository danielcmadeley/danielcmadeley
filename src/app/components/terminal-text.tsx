'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'motion/react'
import { useTypewriterSound } from '@/hooks/use-typewriter-sound'

interface TerminalTextProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export const TerminalText = ({ children, delay = 0, className = '' }: TerminalTextProps) => {
  const elementRef = useRef(null)
  const { playSound, stopSound } = useTypewriterSound()

  useEffect(() => {
    const element = elementRef.current

    if (element) {
      // Hide the element initially
      gsap.set(element, { opacity: 0 })

      // Create the reveal animation
      const tl = gsap.timeline({
        delay,
        onStart: () => playSound(),
        onComplete: () => stopSound(),
      })

      tl.to(element, {
        opacity: 1,
        duration: 0.2,
        ease: 'none',
      }).to(
        element,
        {
          color: 'currentColor',
          duration: 0.1,
          ease: 'none',
        },
        '-=0.1',
      )
    }

    return () => {
      stopSound()
    }
  }, [delay, playSound, stopSound])

  return (
    <motion.div
      ref={elementRef}
      className={`terminal-text ${className}`}
      initial={{ opacity: 0 }}
      style={{ textShadow: '0 0 8px currentColor' }}
    >
      {children}
    </motion.div>
  )
}
