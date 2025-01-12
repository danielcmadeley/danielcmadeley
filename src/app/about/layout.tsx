import { DownloadCV } from '@/components/download-cv'
import Sidebar from '@/components/sidebar'

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full flex flex-col overflow-hidden">
      <div className="h-full grid grid-cols-3">
        <Sidebar />
        <div className="col-span-2 h-full overflow-hidden">{children}</div>
      </div>
      <DownloadCV />
    </main>
  )
}
