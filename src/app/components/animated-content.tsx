'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion } from 'motion/react'
import { ContentSection } from '../data/content'

interface AnimatedContentProps {
  section: ContentSection
}

export const AnimatedContent = ({ section }: AnimatedContentProps) => {
  const contentRef = useRef(null)

  useEffect(() => {
    const element = contentRef.current
    if (element) {
      gsap.set(element, { opacity: 0, y: 20 })

      const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
      })

      tl.to(element, {
        opacity: 1,
        y: 0,
        duration: 0.6,
      })
    }

    return () => {
      const element = contentRef.current
      if (element) {
        gsap.to(element, {
          opacity: 0,
          y: -20,
          duration: 0.3,
        })
      }
    }
  }, [section])

  return (
    <motion.div
      ref={contentRef}
      className="pr-4 space-y-6"
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
    >
      <h1 className="text-2xl font-bold terminal-text">{section.title}</h1>

      {section.content.map((paragraph, index) => (
        <motion.p
          key={index}
          className="text-neutral-300"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 + index * 0.1 }}
        >
          {paragraph}
        </motion.p>
      ))}

      {section.skills && (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          {section.skills.map((skillCategory, index) => (
            <motion.div
              key={index}
              className="space-y-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
            >
              <h2 className="text-xl font-semibold text-neutral-100">{skillCategory.category}</h2>
              <ul className="list-disc list-inside space-y-1">
                {skillCategory.items.map((skill, skillIndex) => (
                  <motion.li
                    key={skillIndex}
                    className="text-neutral-300"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 + skillIndex * 0.05 }}
                  >
                    {skill}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  )
}
