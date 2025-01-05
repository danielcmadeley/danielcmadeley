'use client'

import { motion } from 'motion/react'

interface TerminalSectionProps {
  title: string
  content: string
  index: number
}

export function TerminalSection({ title, content, index }: TerminalSectionProps) {
  return (
    <motion.div
      className="mb-8 border border-[#33ff33]/20 rounded-lg p-6 bg-[#001100]/50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <h2 className="text-xl font-bold mb-4 text-[#33ff33]">{`> ${title}`}</h2>
      <div className="text-[#33ff33]/70">
        <p className="text-left whitespace-pre-wrap leading-relaxed">{content}</p>
      </div>
    </motion.div>
  )
}
