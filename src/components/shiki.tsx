'use client'

import { useEffect, useState } from 'react'
import { getHighlighter } from 'shiki/bundle/web'

interface ShikiProps {
  code: string
  language: string
}

export function Shiki({ code, language }: ShikiProps) {
  const [highlightedCode, setHighlightedCode] = useState<string | null>(null)

  useEffect(() => {
    const highlight = async () => {
      try {
        // Normalize language name to common aliases
        const normalizedLang = language.toLowerCase().trim()
        const langMap: { [key: string]: string } = {
          typescript: 'ts',
          javascript: 'js',
          // Add more mappings as needed
        }
        const lang = langMap[normalizedLang] || normalizedLang

        const highlighter = await getHighlighter({
          themes: ['github-dark'],
          langs: [lang],
        })

        const html = await highlighter.codeToHtml(code, {
          lang,
          theme: 'github-dark',
        })

        setHighlightedCode(html)
      } catch (error) {
        console.error('Error highlighting code:', error, { language })
        // Fallback to plain text if highlighting fails
        setHighlightedCode(`<pre><code>${code}</code></pre>`)
      }
    }

    highlight()
  }, [code, language])

  // Show a loading state while highlighting
  if (!highlightedCode) {
    return <div className="animate-pulse bg-neutral-800 rounded-lg h-32" />
  }

  return (
    <div
      className="rounded-lg overflow-hidden bg-[#0d1117]" // GitHub Dark theme background
      dangerouslySetInnerHTML={{ __html: highlightedCode }}
    />
  )
}
