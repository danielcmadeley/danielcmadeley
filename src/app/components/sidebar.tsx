'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
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
    }
  }, [pathname])

  return (
    <div className="h-full grid grid-cols-3 col-span-1">
      <div className="col-span-2 flex flex-col justify-between ">
        <div className="flex flex-col h-[25%] pt-2 pl-2 gap-8">
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
        <div className="h-[50%] pt-4 pl-2 ">
          <nav className="text-sm">
            <ul>
              <li key="about">
                <button
                  onClick={() => {
                    if (activePrimaryLink === 'about') {
                      setActivePrimaryLink(null)
                      router.push('/')
                    } else {
                      setActivePrimaryLink('about')
                    }
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
        <div className="h-[25%] flex flex-col justify-end gap-4 pl-2">
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
        <div className="h-[25%]"></div>
        <div className="h-[50%] pt-4 pl-2 ">
          <nav className="text-sm">
            <ul>
              <li key="about">
                <div className="space-y-2">
                  <div className={`${activePrimaryLink === 'about' ? 'block' : 'hidden'}`}>
                    <Link
                      href="/about/background"
                      className="text-neutral-500 hover:text-neutral-300"
                    >
                      Background
                    </Link>
                  </div>
                  <div className={`${activePrimaryLink === 'about' ? 'block' : 'hidden'}`}>
                    <Link href="/about/skills" className="text-neutral-500 hover:text-neutral-300">
                      Skills
                    </Link>
                  </div>
                  <div className={`${activePrimaryLink === 'about' ? 'block' : 'hidden'}`}>
                    <Link
                      href="/about/education"
                      className="text-neutral-500 hover:text-neutral-300"
                    >
                      Education
                    </Link>
                  </div>
                </div>
              </li>
            </ul>
          </nav>
        </div>
        <div className="h-[25%]"></div>
      </div>
    </div>
  )
}

export default Sidebar
