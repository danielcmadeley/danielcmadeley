'use client'
import { useState } from 'react'

const DownloadCV = () => {
  const [error, setError] = useState<string | null>(null)

  const handleDownload = async () => {
    try {
      const response = await fetch('/api/cv')
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'File not found')
      }

      // Follow the redirect and get the file
      const fileResponse = await fetch(response.url)
      if (!fileResponse.ok) {
        throw new Error('Failed to download file')
      }

      const blob = await fileResponse.blob()
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'danielcmadeley-developer-cv.docx'
      link.click()
      window.URL.revokeObjectURL(url)
    } catch (err) {
      setError('Unable to download CV at this time')
      console.error('Download failed:', err)
    }
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
      {error && <span className="text-red-500 text-xs ml-2">{error}</span>}
    </button>
  )
}

export default DownloadCV
