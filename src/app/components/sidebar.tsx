'use client'

import Link from 'next/link'
import { ModeToggle } from './mode-toggle'
import TimeDisplay from './time-display'
import { useState } from 'react'
import DayDisplay from './day-display'

// Add this navigation data structure
const navigationLinks = [
  {
    title: 'About',
    href: '/about',
    secondaryLinks: [
      { title: 'Background', href: '/about/background' },
      { title: 'Skills', href: '/about/skills' },
      { title: 'Education', href: '/about/education' },
    ],
  },
  {
    title: 'Work',
    href: '/work',
    secondaryLinks: [
      { title: 'Projects', href: '/work/projects' },
      { title: 'Experience', href: '/work/experience' },
      { title: 'Research', href: '/work/research' },
    ],
  },
  {
    title: 'Journal',
    href: '/journal',
    secondaryLinks: [
      { title: 'Articles', href: '/journal/articles' },
      { title: 'Notes', href: '/journal/notes' },
      { title: 'Tutorials', href: '/journal/tutorials' },
    ],
  },
]

const Sidebar = () => {
  // Add state for tracking active primary link
  const [activePrimaryLink, setActivePrimaryLink] = useState<string | null>(null)
  // Add state for tracking active secondary link
  const [activeSecondaryLink, setActiveSecondaryLink] = useState<string | null>(null)

  // Add this handler function
  const handlePrimaryLinkClick = (linkTitle: string, href: string) => {
    // If clicking the same link, close it by setting to null
    if (linkTitle === activePrimaryLink) {
      setActivePrimaryLink(null)
      // Clear both section and path parameters when closing
      window.history.pushState({}, '', '/')
    } else {
      setActivePrimaryLink(linkTitle)
      // Update URL with only the section parameter
      window.history.pushState({}, '', `/?section=${href.substring(1)}`)
    }
    // Reset secondary link when changing primary links
    setActiveSecondaryLink(null)
  }

  return (
    <div className="h-full grid grid-cols-3 col-span-1">
      <div className="col-span-2 flex flex-col justify-between ">
        <div className="flex flex-col h-[30%] pt-2 pl-2 gap-8">
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

          <div>
            <h3 className="text-md pb-16 text-neutral-500">
              “BRIDGING <span className="text-neutral-50">CLASSICAL MECHANICS</span> AND{' '}
              <span className="text-neutral-50">COMPUTER SCIENCE</span> TO ENGINEER IMPACTFUL
              SOLUTIONS FOR <span className="text-neutral-50">REAL-WORLD </span> CHALLENGES.”
            </h3>
          </div>
        </div>
        {/* Primary Links */}
        <div className="h-[40%] pt-4 pl-2">
          <nav className="text-sm">
            <ul>
              {navigationLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      handlePrimaryLinkClick(link.title, link.href)
                    }}
                    className={`hover:text-neutral-300 ${
                      activePrimaryLink === link.title ? 'text-neutral-50' : 'text-neutral-500'
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="h-[30%] flex flex-col justify-end  gap-4 pb-2 pl-2 ">
          <div className="text-sm">
            <ModeToggle />
            <DayDisplay />
            <TimeDisplay />
          </div>
          <div className="text-xs  text-neutral-500 ">
            <nav>
              <ul>
                <li>
                  <Link href="https://x.com/danielcmadeley" className="hover:text-neutral-300">
                    X
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/danielcmadeley" className="hover:text-neutral-300">
                    GITHUB
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://www.linkedin.com/in/daniel-madeley-4a2a59306/"
                    className="hover:text-neutral-300"
                  >
                    LINKEDIN
                  </Link>
                </li>
                <li>
                  <Link
                    href="mailto:daniel@madeleydesignstudio.org"
                    className="hover:text-neutral-300"
                  >
                    DANIEL@MADELEYDESIGNSTUDIO.ORG
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Secondary Links */}
      <div className="flex flex-col justify-between">
        <div className="h-[30%]"></div>
        <div className="h-[40%] pt-4 pl-2">
          <nav className="text-sm">
            {activePrimaryLink && (
              <ul className="space-y-6">
                {navigationLinks
                  .filter((primaryLink) => primaryLink.title === activePrimaryLink)
                  .map((primaryLink) => (
                    <li key={primaryLink.href} className="">
                      {primaryLink.secondaryLinks.map((secondaryLink) => (
                        <div key={secondaryLink.href}>
                          <Link
                            href={`/?path=${secondaryLink.href.substring(1)}`}
                            onClick={() => setActiveSecondaryLink(secondaryLink.title)}
                            className={`hover:text-neutral-300 ${
                              activeSecondaryLink === secondaryLink.title
                                ? 'text-neutral-50'
                                : 'text-neutral-500'
                            }`}
                          >
                            {secondaryLink.title}
                          </Link>
                        </div>
                      ))}
                    </li>
                  ))}
              </ul>
            )}
          </nav>
        </div>
        <div className="h-[30%]"></div>
      </div>
    </div>
  )
}

export default Sidebar
