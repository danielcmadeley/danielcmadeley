import { ScrollArea } from '@/components/ui/scroll-area'
import { contentData, type ContentSection } from '@/app/data/content'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const section = contentData.projects[slug as keyof typeof contentData.projects] as ContentSection

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[25%]"></div>
      <div className="h-[75%] w-full pt-4 pl-2">
        <ScrollArea className="h-full max-w-3xl">
          <div className="pr-4 space-y-6">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold">{section.title}</h1>
              {section.category && (
                <span
                  className={`px-3 py-1 rounded-full text-sm ${
                    section.category === 'software'
                      ? 'bg-blue-500/20 text-blue-200'
                      : 'bg-green-500/20 text-green-200'
                  }`}
                >
                  {section.category}
                </span>
              )}
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
