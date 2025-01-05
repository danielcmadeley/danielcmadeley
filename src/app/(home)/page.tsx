import { Header } from '@/app/components/header'
import { Navigation } from '@/app/components/navigation'
import { Footer } from '@/app/components/footer'

export default function Home() {
  return (
    <main className="h-full w-full flex flex-col overflow-hidden">
      <div className="p-8 md:p-12 flex flex-col h-full">
        <Header />
        <Navigation />
        <Footer />
      </div>
    </main>
  )
}
