'use client'

import { Github, Linkedin } from 'lucide-react'
import { useState } from 'react'

export function Footer() {
  const [theme, setTheme] = useState('DARK')

  return (
    <footer className="grid grid-cols-2 gap-8 mt-12">
      <div className="space-y-4">
        <div className="space-x-2 text-sm">
          <button
            onClick={() => setTheme('LIGHT')}
            className={`tracking-wider ${theme === 'LIGHT' ? 'text-gray-200' : 'text-gray-500'}`}
          >
            LIGHT
          </button>
          <span className="text-gray-600">/</span>
          <button
            onClick={() => setTheme('DARK')}
            className={`tracking-wider ${theme === 'DARK' ? 'text-gray-200' : 'text-gray-500'}`}
          >
            DARK
          </button>
        </div>

        <div className="space-y-1">
          <div className="text-sm tracking-wider">SUNDAY 5th JANUARY</div>
          <div className="text-sm tracking-wider">19:33</div>
        </div>

        <div className="space-y-1">
          <a
            href="https://github.com"
            className="text-sm tracking-wider text-gray-500 flex items-center gap-2"
          >
            <Github size={16} />
            GITHUB
          </a>
          <a
            href="https://linkedin.com"
            className="text-sm tracking-wider text-gray-500 flex items-center gap-2"
          >
            <Linkedin size={16} />
            LINKEDIN
          </a>
          <a
            href="mailto:DANIEL.C.MADELEY@GMAIL.COM"
            className="text-sm tracking-wider text-gray-500"
          >
            DANIEL.C.MADELEY@GMAIL.COM
          </a>
        </div>
      </div>

      <div className="flex justify-end items-end">
        <div className="space-x-2 text-sm">
          <a href="#" className="tracking-wider text-gray-500">
            DOWNLOAD
          </a>
          <span className="text-gray-600">{'//'}</span>
          <a href="#" className="tracking-wider text-gray-500">
            CV
          </a>
        </div>
      </div>
    </footer>
  )
}
