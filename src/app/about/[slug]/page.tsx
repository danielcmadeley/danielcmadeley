import { ScrollArea } from '@/app/components/ui/scroll-area'
import { contentData, type ContentSection } from '@/app/data/content'
import { AnimatedContent } from '@/app/components/animated-content'
import { notFound } from 'next/navigation'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const section = contentData.about[slug as keyof typeof contentData.about]

  if (!section) {
    notFound()
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[25%]"></div>
      <div className="h-[75%] w-full pt-4 pl-2">
        <ScrollArea className="h-full max-w-3xl">
          <AnimatedContent section={section} />
        </ScrollArea>
      </div>
    </div>
  )
}
