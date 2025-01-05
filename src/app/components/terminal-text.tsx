import { motion } from 'motion/react'
import React from 'react'

interface TerminalTextProps {
  text: string
  delay?: number
  className?: string
  duration?: number
}

const TerminalText = ({ text, delay = 0, className = '', duration = 1 }: TerminalTextProps) => {
  const characters = text.split('')

  const container = {
    hidden: { opacity: 1 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: duration / characters.length, delayChildren: delay },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  }

  return (
    <motion.span variants={container} initial="hidden" animate="visible" className={className}>
      {characters.map((char, index) => (
        <motion.span key={index} variants={child} style={{ display: 'inline-block' }}>
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default TerminalText
