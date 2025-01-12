'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import DayDisplay from './day-display'
import { ModeToggle } from './mode-toggle'
import TimeDisplay from './time-display'

const Sidebar = () => {
  const [activePrimaryLink, setActivePrimaryLink] = useState<string | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    // Check if the current path starts with any primary routes
    if (pathname?.startsWith('/about')) {
      setActivePrimaryLink('about')
    }
    // Add other primary routes as needed
  }, [pathname])

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
        <div className="h-[40%] pt-4 pl-2 ">
          <nav className="text-sm">
            <ul>
              <li key="about">
                <button
                  onClick={() => {
                    setActivePrimaryLink(activePrimaryLink === 'about' ? null : 'about')
                  }}
                  className={`hover:text-neutral-300 ${
                    activePrimaryLink === 'about' ? 'text-neutral-50' : 'text-neutral-500'
                  }`}
                >
                  About
                </button>
              </li>
            </ul>
          </nav>
        </div>
        <div className="h-[30%] flex flex-col justify-end  gap-4 pl-2 pb-24">
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

      <div className="flex flex-col justify-between">
        <div className="h-[30%]"></div>
        <div className="h-[40%] pt-4 pl-2 ">
          <nav className="text-sm">
            <ul className="space-y-6">
              <li
                key="about"
                className={`space-y-2 ${activePrimaryLink === 'about' ? 'block' : 'hidden'}`}
              >
                <div key="about">
                  <Link
                    href="/about/background"
                    className="text-neutral-500 hover:text-neutral-300"
                  >
                    Background
                  </Link>
                </div>
                <div key="skills">
                  <Link href="/about/skills" className="text-neutral-500 hover:text-neutral-300">
                    Skills
                  </Link>
                </div>
                <div key="education">
                  <Link href="/about/education" className="text-neutral-500 hover:text-neutral-300">
                    Education
                  </Link>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="h-[30%]"></div>
      </div>
    </div>
  )
}

export default Sidebar
