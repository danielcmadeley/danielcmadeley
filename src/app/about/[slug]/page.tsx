import { ScrollArea } from '@/components/ui/scroll-area'
import { contentData, type ContentSection } from '@/app/data/content'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const section = contentData.about[slug as keyof typeof contentData.about] as ContentSection

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[25%] lg:block hidden"></div>
      <div className="h-full lg:h-[75%] w-full pt-6 px-6 lg:px-8">
        <ScrollArea className="h-full max-w-4xl">
          <div className="pr-6 space-y-8">
            <h1 className="text-3xl font-bold text-neutral-100">{section.title}</h1>
            {section.content.map((paragraph, index) => (
              <p key={index} className="text-neutral-400 text-sm leading-relaxed">
                {paragraph}
              </p>
            ))}
            {section.skills && (
              <div className="space-y-8 mt-12">
                {section.skills.map((skillCategory, index) => (
                  <div key={index} className="space-y-4">
                    <h2 className="text-lg font-semibold text-neutral-200 flex items-center gap-2">
                      <span className="h-1.5 w-1.5 rounded-full bg-neutral-500"></span>
                      {skillCategory.category}
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {skillCategory.items.map((skill, skillIndex) => (
                        <div
                          key={skillIndex}
                          className="px-4 py-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 
                            transition-colors text-neutral-400 text-xs border border-neutral-800"
                        >
                          {skill}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
