import { ScrollArea } from '@/components/ui/scroll-area'
import { contentData } from '@/app/data/content'
import { Shiki } from '@/components/shiki'
import { Katex } from '@/components/katex'

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug
  const section = contentData.journal[slug as keyof typeof contentData.journal]

  // Format the date consistently
  const formattedDate = new Date(section.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  const renderContent = (content: string) => {
    // Check if content is a math formula (enclosed in $$)
    if (content.startsWith('$$') && content.endsWith('$$')) {
      return <Katex math={content.slice(2, -2)} display={true} />
    }

    // Check if content is a code block
    if (content.startsWith('```')) {
      const lines = content.split('\n')
      const firstLine = lines[0].slice(3).trim()
      const lastLineIndex = lines.findIndex((line, i) => i > 0 && line.trim() === '```')

      // Extract language and handle potential language:filename format
      const language = firstLine.split(':')[0] || 'text'

      // Get code content, excluding first line (language) and last line (```)
      const code = lines.slice(1, lastLineIndex).join('\n')

      // Use a key to ensure proper remounting when content changes
      return <Shiki key={`${language}-${code}`} code={code} language={language} />
    }

    // Regular paragraph
    return <p className="text-neutral-300">{content}</p>
  }

  return (
    <div className="h-full w-full flex flex-col">
      <div className="h-[25%] lg:block hidden"></div>
      <div className="h-full lg:h-[75%] w-full pt-4 px-4 lg:pl-2">
        <ScrollArea className="h-full max-w-3xl">
          <div className="pr-4 space-y-6">
            <div className="space-y-4">
              <h1 className="text-2xl font-bold">{section.title}</h1>
              <div className="flex items-center space-x-4 text-sm text-neutral-400">
                <time dateTime={section.date}>{formattedDate}</time>
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
              <div key={index}>{renderContent(paragraph)}</div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}
