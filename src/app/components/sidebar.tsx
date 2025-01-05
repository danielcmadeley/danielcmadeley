import React from 'react'
import Link from 'next/link'
import { ModeToggle } from './mode-toggle'

const Sidebar = () => {
  return (
    <div className="h-full grid grid-cols-3 col-span-1">
      <div className="col-span-2  flex flex-col justify-between space-y-4">
        <div className="flex flex-col justify-between h-[30%] ">
          <div>
            <h1 className="text-[27px] font-bold uppercase">Daniel Charles Madeley</h1>
            <div className="flex justify-between">
              <h2 className="text-sm font-bold uppercase">Design</h2>
              <div className="flex items-center space-x-6">
                <h2>{'//'} </h2>
                <h2 className="text-sm font-bold uppercase">Engineer</h2>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl">
              “BRIDGING CLASSICAL MECHANICS AND COMPUTER SCIENCE TO ENGINEER IMPACTFUL SOLUTIONS FOR
              REAL-WORLD CHALLENGES.”
            </h3>
          </div>
        </div>
        <div className="h-[45%]">
          <nav>
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
        <div className="h-[25%] flex flex-col justify-end gap-4 ">
          <div>
            <ModeToggle />
            <div>
              <h4>Sunday</h4>
            </div>
            <div>
              <h4>15:28</h4>
            </div>
          </div>
          <div>
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
      <div className="">
        <div className="h-[30%] "></div>
        <div className="h-[45%] ">
          {' '}
          <nav>
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
        <div className="h-[25%]"></div>
      </div>
    </div>
  )
}

export default Sidebar
