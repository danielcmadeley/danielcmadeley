'use client'

import { ScrollArea } from '@/components/ui/scroll-area'

const About = () => {
  return (
    <div className="col-span-2 flex flex-col max-w-3xl h-screen overflow-hidden">
      <div className="h-[30%]"></div>
      <div className="h-[70%] pt-4 pl-2 text-neutral-300 overflow-hidden">
        <ScrollArea className="h-full text-sm">
          <h2 className="text-xl font-bold mb-4">About</h2>
          <div className="whitespace-pre-line">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa numquam distinctio nihil
            exercitationem aut! At quia nobis inventore error consequuntur incidunt accusantium
            nesciunt dolores delectus.
          </div>
        </ScrollArea>
      </div>
    </div>
  )
}

export default About
