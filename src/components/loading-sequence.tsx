'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { Terminal } from '@/components/terminal'
import { MainContent } from '@/components/main-content'
import { checkFirstVisit } from '@/app/actions'

export function LoadingSequence() {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Check if this is the first visit
    checkFirstVisit().then((isFirstVisit) => {
      if (!isFirstVisit) {
        setIsLoading(false)
        setShowContent(true)
        return
      }

      // Only run animation sequence for first-time visitors
      const tl = gsap.timeline({
        onComplete: () => {
          setShowContent(true)
        },
      })

      // After terminal messages complete (6 seconds)
      gsap.delayedCall(6, () => {
        if (containerRef.current) {
          tl.to(containerRef.current, {
            scale: 1.1,
            duration: 0.5,
            ease: 'power2.inOut',
          })
            .to(containerRef.current, {
              opacity: 0,
              duration: 0.5,
              ease: 'power2.inOut',
            })
            .call(() => setIsLoading(false))
        }
      })
    })
  }, [])

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          ref={containerRef}
          key="terminal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50"
        >
          <Terminal />
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="h-full"
        >
          <MainContent />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
