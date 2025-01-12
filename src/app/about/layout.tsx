import type { Metadata } from 'next'
import { Suspense } from 'react'
import Sidebar from '../components/sidebar'
import { DownloadCV } from '../components/download-cv'

export const metadata: Metadata = {
  title: 'Daniel Charles Madeley',
  description: 'Design Engineer Portfolio',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full flex flex-col overflow-hidden">
      <div className="h-full grid grid-cols-3">
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
      </div>
      <DownloadCV />
    </main>
  )
}
