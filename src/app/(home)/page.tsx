import { Suspense } from 'react'
import Content from '../components/content'
import DownloadCV from '../components/download-cv'
import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col overflow-hidden">
      <div className="h-full grid grid-cols-3">
        <Sidebar />
        <Suspense fallback={<div>Loading...</div>}>
          <Content />
        </Suspense>
      </div>
      <DownloadCV />
    </main>
  )
}
