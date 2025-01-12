import { ScrollArea } from '@/components/ui/scroll-area'
import { contentData, type ContentSection } from '@/app/data/content'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const section = contentData.journal[slug as keyof typeof contentData.journal]

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[25%] lg:block hidden"></div>
      <div className="h-full lg:h-[75%] w-full pt-4 px-4 lg:pl-2">
        <ScrollArea className="h-full max-w-3xl">
          <div className="pr-4 space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{section.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-neutral-400">
                <time dateTime={section.date}>{section.date}</time>
                <span>•</span>
                <span>{section.readingTime}</span>
              </div>
              <div className="flex gap-2">
                {section.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-neutral-800 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="text-neutral-300 italic">{section.excerpt}</div>
            </div>

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
