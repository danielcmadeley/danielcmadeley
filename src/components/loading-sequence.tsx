'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import gsap from 'gsap'
import { Terminal } from '@/components/terminal'
import { MainContent } from '@/components/main-content'
import { checkFirstVisit } from '@/app/actions'

export function LoadingSequence() {
  const [isLoading, setIsLoading] = useState(false)
  const [showContent, setShowContent] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleFirstInteraction = async () => {
      if (hasInteracted) return
      setHasInteracted(true)

      const isFirstVisit = await checkFirstVisit()
      if (!isFirstVisit) {
        setShowContent(true)
        return
      }

      setIsLoading(true)
      const tl = gsap.timeline({
        onComplete: () => setShowContent(true),
      })

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
    }

    window.addEventListener('click', handleFirstInteraction)
    return () => window.removeEventListener('click', handleFirstInteraction)
  }, [hasInteracted])

  if (!hasInteracted) {
    return (
      <div className="h-full cursor-pointer" onClick={() => setHasInteracted(true)}>
        <MainContent />
      </div>
    )
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
