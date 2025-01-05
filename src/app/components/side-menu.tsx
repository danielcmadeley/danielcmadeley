import React from 'react'
import { ModeToggle } from './mode-toggle'
import Name from './name'
import SubTitle from './sub-title'
const SideMenu = () => {
  return (
    <div className="w-full flex h-full">
      <div className="flex flex-col w-3/4 h-full">
        <Name />
        <SubTitle />
        <div className="w-full h-full bg-red-400/40">
          <h1>Menu</h1>
        </div>
        <ModeToggle />
      </div>
      <div className="w-1/4 h-full">Menu Two</div>
    </div>
  )
}

export default SideMenu
