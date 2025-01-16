import { DownloadCV } from '@/components/download-cv'
import Sidebar from '@/components/sidebar'

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="h-full w-full flex flex-col overflow-hidden bg-gradient-to-br from-neutral-950 to-neutral-900">
      <div className="h-full grid grid-cols-1 lg:grid-cols-3 gap-0">
        <div className="relative">
          <Sidebar />
        </div>
        <div className="col-span-1 lg:col-span-2 h-full overflow-hidden relative">
          <div className="absolute inset-0 bg-grid-white/[0.02] -z-10"></div>
          {children}
        </div>
      </div>
      <DownloadCV />
    </main>
  )
}
