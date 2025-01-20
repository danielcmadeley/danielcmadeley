'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { Terminal } from '@/components/terminal'
import { MainContent } from '@/components/main-content'
import { checkFirstVisit } from '@/app/actions'

const RESET_TIMEOUT = 2 * 60 * 1000 // 2 minutes in milliseconds

export function LoadingSequence() {
  const [isInitialized, setIsInitialized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const lastVisitTime = localStorage.getItem('lastVisitTime')
    const currentTime = Date.now()
    const shouldShowTerminal =
      !lastVisitTime || currentTime - parseInt(lastVisitTime) > RESET_TIMEOUT

    checkFirstVisit().then((isFirstVisit) => {
      if (!shouldShowTerminal && !isFirstVisit) {
        setIsLoading(false)
        setShowContent(true)
      } else {
        setIsLoading(true)
        // Only run animation sequence for first-time visitors or after timeout
        const tl = gsap.timeline({
          onComplete: () => {
            setShowContent(true)
          },
        })

        // After terminal messages complete (6 seconds)
        gsap.delayedCall(2, () => {
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
              .call(() => {
                setIsLoading(false)
                localStorage.setItem('lastVisitTime', Date.now().toString())
              })
          }
        })
      }
      setIsInitialized(true)
    })

    // Update last visit time when component unmounts
    return () => {
      localStorage.setItem('lastVisitTime', Date.now().toString())
    }
  }, [])

  if (!isInitialized) {
    return null
  }

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
