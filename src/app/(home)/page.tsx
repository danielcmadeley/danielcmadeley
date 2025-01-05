import Content from '../components/content'
import Sidebar from '../components/sidebar'

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col overflow-hidden">
      <div className="h-full grid grid-cols-3 p-2">
        <Sidebar />

        <Content />
      </div>
    </main>
  )
}
