'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'motion/react'
import { TextScramble } from '@/components/text-scramble'
import { Cursor } from '@/components/cursor'

const messages = [
  'INITIATING SECURE CONNECTION...',
  'DECRYPTING NEURAL PROTOCOLS...',
  'ACCESSING QUANTUM MAINFRAME...',
  'BYPASSING SECURITY MEASURES...',
  'ESTABLISHING NEURAL LINK...',
  'CONNECTION ESTABLISHED.',
]

export function Terminal() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (containerRef.current) {
      gsap.to(containerRef.current, {
        boxShadow: '0 0 30px rgba(115, 115, 115, 0.3)',
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl bg-neutral-900/50 backdrop-blur-sm rounded-lg border border-neutral-500/20 p-8 font-mono text-neutral-300 shadow-lg"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-green-500" />
        </div>

        <div className="space-y-4">
          <TextScramble messages={messages} />
          <Cursor />
        </div>

        <div className="mt-8 flex justify-between text-xs text-neutral-400/50">
          <span>QUANTUM-LINK v2.0.45</span>
          <span>ENCRYPTION: AES-4096</span>
        </div>
      </motion.div>
    </div>
  )
}
