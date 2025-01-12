import Sidebar from './sidebar'
import { DownloadCV } from './download-cv'

export function MainContent() {
  return (
    <main className="h-full w-full flex flex-col overflow-hidden">
      <div className="flex-1 grid grid-cols-3">
        <Sidebar />
      </div>
      <DownloadCV />
    </main>
  )
}
