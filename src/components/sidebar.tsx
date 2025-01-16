'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DayDisplay from './day-display'
import { ModeToggle } from './mode-toggle'
import TimeDisplay from './time-display'
import { contentData } from '../app/data/content'
import { Menu } from 'lucide-react'

const Sidebar = () => {
  const [activePrimaryLink, setActivePrimaryLink] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const MobileMenu = () => (
    <div className="lg:hidden fixed inset-0 bg-background/95 z-40 overflow-y-auto">
      <div className="p-4 space-y-6 bg-neutral-950/90">
        {/* Mobile Header */}
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold text-neutral-50">
            DCM
          </Link>
          <button onClick={toggleMobileMenu} className="p-2 text-neutral-50">
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Navigation */}
        <nav className="space-y-6">
          {/* About Section */}
          <div>
            <button
              onClick={() => setActivePrimaryLink(activePrimaryLink === 'about' ? null : 'about')}
              className={`w-full flex justify-between items-center py-2 ${
                activePrimaryLink === 'about' ? 'text-neutral-50' : 'text-neutral-400'
              }`}
            >
              <span className="text-lg">About</span>
              <span className="text-sm">{activePrimaryLink === 'about' ? '−' : '+'}</span>
            </button>
            {activePrimaryLink === 'about' && (
              <div className="mt-2 ml-4 space-y-2 border-l border-neutral-700 pl-4">
                {['background', 'skills', 'education'].map((item) => (
                  <Link
                    key={item}
                    href={`/about/${item}`}
                    className="block py-2 text-neutral-400 hover:text-neutral-50 capitalize"
                    onClick={toggleMobileMenu}
                  >
                    {item}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Projects Section */}
          <div>
            <button
              onClick={() =>
                setActivePrimaryLink(activePrimaryLink === 'projects' ? null : 'projects')
              }
              className={`w-full flex justify-between items-center py-2 ${
                activePrimaryLink === 'projects' ? 'text-neutral-50' : 'text-neutral-400'
              }`}
            >
              <span className="text-lg">Projects</span>
              <span className="text-sm">{activePrimaryLink === 'projects' ? '−' : '+'}</span>
            </button>
            {activePrimaryLink === 'projects' && (
              <div className="mt-2 ml-4 space-y-4 border-l border-neutral-700 pl-4">
                {/* Software Projects */}
                <div className="space-y-2">
                  <h3 className="text-sm text-neutral-300 uppercase">Software</h3>
                  {[
                    'smart-inventory-system',
                    'predictive-maintenance-app',
                    'blockchain-supply-chain',
                    'automated-testing-framework',
                  ].map((project) => (
                    <Link
                      key={project}
                      href={`/projects/${project}`}
                      className="block py-2 text-neutral-400 hover:text-neutral-50"
                      onClick={toggleMobileMenu}
                    >
                      {project
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </Link>
                  ))}
                </div>
                {/* Structural Projects */}
                <div className="space-y-2">
                  <h3 className="text-sm text-neutral-300 uppercase">Structural</h3>
                  {[
                    'bridge-structural-analysis',
                    'seismic-resistant-design',
                    'composite-material-structure',
                    'renewable-energy-structure',
                  ].map((project) => (
                    <Link
                      key={project}
                      href={`/projects/${project}`}
                      className="block py-2 text-neutral-400 hover:text-neutral-50"
                      onClick={toggleMobileMenu}
                    >
                      {project
                        .split('-')
                        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                        .join(' ')}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Journal Section */}
          <div>
            <button
              onClick={() =>
                setActivePrimaryLink(activePrimaryLink === 'journal' ? null : 'journal')
              }
              className={`w-full flex justify-between items-center py-2 ${
                activePrimaryLink === 'journal' ? 'text-neutral-50' : 'text-neutral-400'
              }`}
            >
              <span className="text-lg">Journal</span>
              <span className="text-sm">{activePrimaryLink === 'journal' ? '−' : '+'}</span>
            </button>
            {activePrimaryLink === 'journal' && (
              <div className="mt-2 ml-4 space-y-2 border-l border-neutral-700 pl-4">
                {Object.entries(contentData.journal).map(([slug, entry]) => (
                  <Link
                    key={slug}
                    href={`/journal/${slug}`}
                    className="block py-2 text-neutral-400 hover:text-neutral-50"
                    onClick={toggleMobileMenu}
                  >
                    {entry.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Mobile Footer */}
        <div className="pt-6 space-y-4 border-t border-neutral-700">
          <div className="flex space-x-4 text-neutral-400">
            <Link href="https://x.com/danielcmadeley" className="hover:text-neutral-50">
              X
            </Link>
            <Link href="https://github.com/danielcmadeley" className="hover:text-neutral-50">
              GitHub
            </Link>
            <Link
              href="https://www.linkedin.com/in/daniel-madeley-4a2a59306/"
              className="hover:text-neutral-50"
            >
              LinkedIn
            </Link>
          </div>
          <div className="text-sm text-neutral-400">
            <ModeToggle />
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <>
      {/* Blur Overlay */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/90 backdrop-blur-sm z-30"
          onClick={toggleMobileMenu}
        />
      )}

      {/* Mobile Menu Button */}
      <button
        onClick={toggleMobileMenu}
        className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-md bg-neutral-800"
      >
        <Menu className="h-6 w-6" />
      </button>

      {/* Mobile Menu */}
      {isMobileMenuOpen && <MobileMenu />}

      {/* Desktop Sidebar */}
      <div className="hidden lg:grid h-full grid-cols-3 col-span-1">
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
                <li key="projects">
                  <button
                    onClick={() => {
                      if (activePrimaryLink === 'projects') {
                        setActivePrimaryLink(null)
                        router.push('/')
                      } else {
                        setActivePrimaryLink('projects')
                      }
                    }}
                    className={`hover:text-neutral-300 ${
                      activePrimaryLink === 'projects' ? 'text-neutral-50' : 'text-neutral-500'
                    }`}
                  >
                    Projects
                  </button>
                </li>
                <li key="journal">
                  <button
                    onClick={() => {
                      if (activePrimaryLink === 'journal') {
                        setActivePrimaryLink(null)
                        router.push('/')
                      } else {
                        setActivePrimaryLink('journal')
                      }
                    }}
                    className={`hover:text-neutral-300 ${
                      activePrimaryLink === 'journal' ? 'text-neutral-50' : 'text-neutral-500'
                    }`}
                  >
                    Journal
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
                    <Link
                      href="https://github.com/danielcmadeley"
                      className="hover:text-neutral-300"
                    >
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
          <div className="h-[50%] pt-4 pl-2">
            <nav className="text-sm">
              <ul>
                <li key="about">
                  <div className="">
                    <div className={`${activePrimaryLink === 'about' ? 'block' : 'hidden'}`}>
                      <Link
                        href="/about/background"
                        className="text-neutral-500 hover:text-neutral-300"
                      >
                        Background
                      </Link>
                    </div>
                    <div className={`${activePrimaryLink === 'about' ? 'block' : 'hidden'}`}>
                      <Link
                        href="/about/skills"
                        className="text-neutral-500 hover:text-neutral-300"
                      >
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
                <li key="projects">
                  <div className="">
                    {activePrimaryLink === 'projects' && (
                      <>
                        <div className="mb-4">
                          <h3 className="text-neutral-400 text-xs uppercase mb-2">Software</h3>
                          <div className="">
                            <div>
                              <Link
                                href="/projects/smart-inventory-system"
                                className="text-neutral-500 hover:text-neutral-300"
                              >
                                Smart Inventory System
                              </Link>
                            </div>
                            <div>
                              <Link
                                href="/projects/predictive-maintenance-app"
                                className="text-neutral-500 hover:text-neutral-300"
                              >
                                Predictive Maintenance
                              </Link>
                            </div>
                            <div>
                              <Link
                                href="/projects/blockchain-supply-chain"
                                className="text-neutral-500 hover:text-neutral-300"
                              >
                                Blockchain Supply Chain
                              </Link>
                            </div>
                            <div>
                              <Link
                                href="/projects/automated-testing-framework"
                                className="text-neutral-500 hover:text-neutral-300"
                              >
                                Testing Framework
                              </Link>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-neutral-400 text-xs uppercase mb-2">Structural</h3>
                          <div className="">
                            <div>
                              <Link
                                href="/projects/bridge-structural-analysis"
                                className="text-neutral-500 hover:text-neutral-300"
                              >
                                Bridge Analysis
                              </Link>
                            </div>
                            <div>
                              <Link
                                href="/projects/seismic-resistant-design"
                                className="text-neutral-500 hover:text-neutral-300"
                              >
                                Seismic Design
                              </Link>
                            </div>
                            <div>
                              <Link
                                href="/projects/composite-material-structure"
                                className="text-neutral-500 hover:text-neutral-300"
                              >
                                Composite Structure
                              </Link>
                            </div>
                            <div>
                              <Link
                                href="/projects/renewable-energy-structure"
                                className="text-neutral-500 hover:text-neutral-300"
                              >
                                Wind Turbine Foundation
                              </Link>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </li>
                <li key="journal">
                  <div className="space-y-2">
                    {activePrimaryLink === 'journal' &&
                      Object.entries(contentData.journal).map(([slug, entry]) => (
                        <div key={slug} className={`block`}>
                          <Link
                            href={`/journal/${slug}`}
                            className="text-neutral-500 hover:text-neutral-300"
                          >
                            {entry.title}
                          </Link>
                        </div>
                      ))}
                  </div>
                </li>
              </ul>
            </nav>
          </div>
          <div className="h-[25%]"></div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
