'use client'
import { useState } from 'react'

export const DownloadCV = () => {
  const handleDownload = () => {
    // Using the public URL of the PDF
    const pdfUrl = '/sample.pdf'

    // Create a link element
    const link = document.createElement('a')
    link.href = pdfUrl
    link.download = 'sample.pdf' // Suggested name for download
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={handleDownload}
      className="fixed bottom-[45px] right-4 flex items-center gap-4 text-sm text-neutral-500 hover:text-neutral-300"
    >
      <h5>Download</h5>
      <div className="flex items-center gap-2">
        <span>{'//'}</span>
        <h5>CV</h5>
      </div>
    </button>
  )
}
