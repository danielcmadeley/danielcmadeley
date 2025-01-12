'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { TerminalText } from './terminal-text'
import DayDisplay from './day-display'
import { ModeToggle } from './mode-toggle'
import TimeDisplay from './time-display'

const Sidebar = () => {
  const [activePrimaryLink, setActivePrimaryLink] = useState<string | null>(null)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    if (pathname?.startsWith('/about')) {
      setActivePrimaryLink('about')
    } else if (pathname?.startsWith('/projects')) {
      setActivePrimaryLink('projects')
    } else if (pathname?.startsWith('/journal')) {
      setActivePrimaryLink('journal')
    }
  }, [pathname])

  return (
    <div className="h-full grid grid-cols-3 col-span-1">
      <div className="col-span-2 flex flex-col justify-between">
        <div className="flex flex-col h-[25%] pt-2 pl-2 gap-8">
          <TerminalText delay={0.2}>
            <Link href="/">
              <h1 className="text-[27px] font-bold uppercase">Daniel Charles Madeley</h1>
              <div className="flex justify-between text-sm text-neutral-500">
                <h2 className="text-sm font-bold uppercase">Design</h2>
                <div className="flex items-center space-x-6">
                  <h2>{'//'} </h2>
                  <h2 className="text-sm font-bold uppercase">Engineer</h2>
                </div>
              </div>
            </Link>
          </TerminalText>

          <TerminalText delay={0.8}>
            <div>
              <h3 className="text-md pb-16 text-neutral-500">
                "BRIDGING <span className="text-neutral-50">CLASSICAL MECHANICS</span> AND{' '}
                <span className="text-neutral-50">COMPUTER SCIENCE</span> TO ENGINEER IMPACTFUL
                SOLUTIONS FOR <span className="text-neutral-50">REAL-WORLD </span> CHALLENGES."
              </h3>
            </div>
          </TerminalText>
        </div>

        <div className="h-[50%] pt-4 pl-2">
          <nav className="text-sm">
            <ul className="space-y-2">
              {['about', 'projects', 'journal'].map((link, index) => (
                <TerminalText key={link} delay={1.2 + index * 0.2}>
                  <li>
                    <button
                      onClick={() => {
                        if (activePrimaryLink === link) {
                          setActivePrimaryLink(null)
                          router.push('/')
                        } else {
                          router.push('/')
                          setActivePrimaryLink(link)
                        }
                      }}
                      className={`hover:text-neutral-300 ${
                        activePrimaryLink === link ? 'text-neutral-50' : 'text-neutral-500'
                      }`}
                    >
                      {link.charAt(0).toUpperCase() + link.slice(1)}
                    </button>
                  </li>
                </TerminalText>
              ))}
            </ul>
          </nav>
        </div>

        <div className="h-[25%] flex flex-col justify-end gap-4 pl-2">
          <TerminalText delay={2}>
            <div className="text-sm">
              <ModeToggle />
              <DayDisplay />
              <TimeDisplay />
            </div>
          </TerminalText>

          <TerminalText delay={2.2}>
            <div className="text-xs text-neutral-500">
              <nav>
                <ul className="space-y-1">
                  {[
                    { href: 'https://x.com/danielcmadeley', text: 'X' },
                    { href: 'https://github.com/danielcmadeley', text: 'GITHUB' },
                    {
                      href: 'https://www.linkedin.com/in/daniel-madeley-4a2a59306/',
                      text: 'LINKEDIN',
                    },
                    {
                      href: 'mailto:daniel@madeleydesignstudio.org',
                      text: 'DANIEL@MADELEYDESIGNSTUDIO.ORG',
                    },
                  ].map((link) => (
                    <li key={link.text}>
                      <Link href={link.href} className="hover:text-neutral-300">
                        {link.text}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </TerminalText>
        </div>
      </div>

      <div className="flex flex-col justify-between">
        <div className="h-[25%]"></div>
        <div className="h-[50%] pt-4 pl-2">
          <nav className="text-sm">
            <ul>
              {['about', 'projects', 'journal'].map((section) => (
                <li key={section}>
                  <div className="space-y-2">
                    {activePrimaryLink === section &&
                      {
                        about: [
                          { href: '/about/background', text: 'Background' },
                          { href: '/about/skills', text: 'Skills' },
                          { href: '/about/education', text: 'Education' },
                        ],
                        projects: [
                          { href: '/projects/project-1', text: 'Project 1' },
                          { href: '/projects/project-2', text: 'Project 2' },
                        ],
                        journal: [
                          { href: '/journal/entry-1', text: 'Entry 1' },
                          { href: '/journal/entry-2', text: 'Entry 2' },
                        ],
                      }[section].map((link, index) => (
                        <TerminalText key={link.text} delay={2.4 + index * 0.2}>
                          <div>
                            <Link
                              href={link.href}
                              className="text-neutral-500 hover:text-neutral-300"
                            >
                              {link.text}
                            </Link>
                          </div>
                        </TerminalText>
                      ))}
                  </div>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="h-[25%]"></div>
      </div>
    </div>
  )
}

export default Sidebar
