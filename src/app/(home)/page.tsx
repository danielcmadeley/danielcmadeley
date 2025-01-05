import { ModeToggle } from '../components/mode-toggle'
import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col overflow-hidden">
      <div className="h-full grid grid-cols-3 p-2">
        <Sidebar />

        <div className="col-span-2">
          <div className="h-[30%] bg-red-400/20"></div>
          <div className="h-[70%] bg-blue-400/20"></div>
        </div>
      </div>
    </main>
  )
}
