import { ScrollArea } from '@/app/components/ui/scroll-area'
import { contentData, type ContentSection } from '@/app/data/content'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const section = contentData.about[slug as keyof typeof contentData.about] as ContentSection

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

            {section.skills && (
              <div className="space-y-6">
                {section.skills.map((skillCategory, index) => (
                  <div key={index} className="space-y-2">
                    <h2 className="text-xl font-semibold text-neutral-100">
                      {skillCategory.category}
                    </h2>
                    <ul className="list-disc list-inside space-y-1">
                      {skillCategory.items.map((skill, skillIndex) => (
                        <li key={skillIndex} className="text-neutral-300">
                          {skill}
                        </li>
                      ))}
                    </ul>
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
