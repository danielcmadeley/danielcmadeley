import type { Metadata } from 'next'
import { DownloadCV } from '../components/download-cv'
import Sidebar from '../components/sidebar'

export const metadata: Metadata = {
  title: 'Daniel Charles Madeley',
  description: 'Design Engineer Portfolio',
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full flex flex-col ">
      <div className=" grid grid-cols-3 overflow-hidden">
        <Sidebar />
        <div className="col-span-2 ">{children}</div>
      </div>
      <DownloadCV />
    </main>
  )
}
