import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/app/components/theme-provider'

export const metadata: Metadata = {
  title: 'Daniel Charles Madeley',
  description: 'Design Engineer Portfolio',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="font-neco">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="h-screen w-screen overflow-hidden">
            <div className="mx-auto py-[40px] h-full w-full">
              <div className="h-full w-full border-t border-b border-neutral-500/20">
                {children}
              </div>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
