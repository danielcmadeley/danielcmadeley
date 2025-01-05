import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

const Sidebar = () => {
  return (
    <div className="h-full grid grid-cols-3 col-span-1">
      <div className="col-span-2 flex flex-col justify-between ">
        <div className="flex flex-col justify-between h-[30%] pt-2 pl-2">
          <div>
            <h1 className="text-[27px] font-bold uppercase">Daniel Charles Madeley</h1>
            <div className="flex justify-between text-sm text-neutral-500">
              <h2 className="text-sm font-bold uppercase">Design</h2>
              <div className="flex items-center space-x-6">
                <h2>{'//'} </h2>
                <h2 className="text-sm font-bold uppercase">Engineer</h2>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl pb-4 text-neutral-500">
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
              <li>
                <Link href="/">About</Link>
              </li>
              <li>
                <Link href="/">Work</Link>
              </li>
              <li>
                <Link href="/">Journal</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="h-[30%] flex flex-col justify-end  gap-4 pb-2 pl-2 ">
          <div className="text-sm">
            <ModeToggle />
            <div>
              <h4>Sunday</h4>
            </div>
            <div>
              <h4>15:28</h4>
            </div>
          </div>
          <div className="text-xs pb-6 text-neutral-500">
            <nav>
              <ul>
                <li>
                  <Link href="/">X</Link>
                </li>
                <li>
                  <Link href="/">GITHUB</Link>
                </li>
                <li>
                  <Link href="/">LINKEDIN</Link>
                </li>
                <li>
                  <Link href="/">DANIEL@MADELEYDESIGNSTUDIO.ORG</Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
      {/* Secondary Links */}
      <div className="flex flex-col justify-between ">
        <div className="h-[30%] "></div>
        <div className="h-[40%]  pt-4 pl-2">
          <nav className="text-sm">
            <ul>
              <li>
                <Link href="/">About</Link>
              </li>
              <li>
                <Link href="/">Work</Link>
              </li>
              <li>
                <Link href="/">Journal</Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="h-[30%] "></div>
      </div>
    </div>
  )
}

export default Sidebar
