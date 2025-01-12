import { ScrollArea } from '@/app/components/ui/scroll-area'
import { contentData, type ContentSection } from '@/app/data/content'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const section = contentData.journal[slug as keyof typeof contentData.journal] as ContentSection

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[25%]"></div>
      <div className="h-[75%] w-full pt-4 pl-2">
        <ScrollArea className="h-full max-w-3xl">
          <div className="pr-4 space-y-6">
            <h1 className="text-2xl font-bold">{section.title}</h1>

            {section.content.map((paragraph, index) => (
              <p key={index} className="text-neutral-300">
                {paragraph}
              </p>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
