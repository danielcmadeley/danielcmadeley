'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

// Content data structure
const contentData = {
  // About section
  'about/background': {
    title: 'Background',
    content: `Born and raised in the intersection of engineering and technology, 
    I've always been fascinated by the way things work... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa numquam distinctio nihil exercitationem aut! At quia nobis inventore error consequuntur incidunt accusantium nesciunt dolores delectus. `,
  },
  'about/skills': {
    title: 'Skills',
    content: `Technical Skills:
    • Programming Languages: Python, JavaScript/TypeScript, C++
    • Web Technologies: React, Next.js, Node.js
    • Engineering: CAD, FEA, CFD Analysis...`,
  },
  'about/education': {
    title: 'Education',
    content: `• Master of Engineering (MEng) - Mechanical Engineering
    • Bachelor of Science (BSc) - Computer Science...`,
  },

  // Work section
  'work/projects': {
    title: 'Projects',
    content: `Featured Projects:
    1. Autonomous Navigation System
    2. Web-based Engineering Simulation Platform
    3. Machine Learning for Predictive Maintenance...`,
  },
  'work/experience': {
    title: 'Experience',
    content: `Professional Experience:
    • Senior Engineer at Tech Corp (2020-Present)
    • Design Engineer at Innovation Labs (2018-2020)...`,
  },
  'work/research': {
    title: 'Research',
    content: `Research Areas:
    • Computational Fluid Dynamics
    • Machine Learning Applications in Engineering
    • Robotics and Control Systems...`,
  },

  // Journal section
  'journal/articles': {
    title: 'Articles',
    content: `Recent Publications:
    • "The Future of Engineering Automation"
    • "Bridging the Gap Between Software and Hardware"...`,
  },
  'journal/notes': {
    title: 'Notes',
    content: `Technical Notes:
    • Implementation of Neural Networks in Physical Systems
    • Best Practices for Engineering Software Development...`,
  },
  'journal/tutorials': {
    title: 'Tutorials',
    content: `Learning Resources:
    • Getting Started with CAD Integration
    • Python for Engineers
    • Web Development Fundamentals...`,
  },
}

const Content = () => {
  const pathname = usePathname()
  const [currentPath, setCurrentPath] = useState<string | null>(pathname)

  // Add this useEffect to handle page refresh
  useEffect(() => {
    // Check if we're on initial load and on a content page
    if (pathname !== '/') {
      window.location.href = '/'
    }
  }, []) // Empty dependency array means this runs once on mount

  // Remove the leading slash from pathname to match contentData keys
  const contentKey = pathname?.substring(1) || null
  const currentContent = contentKey ? contentData[contentKey as keyof typeof contentData] : null

  // Update currentPath when pathname changes
  useEffect(() => {
    setCurrentPath(pathname)
  }, [pathname])

  return (
    <div className="col-span-2 flex flex-col max-w-3xl h-screen overflow-hidden">
      <div className="h-[30%]"></div>
      <div className="h-[70%] pt-4 pl-2 text-neutral-300 overflow-hidden">
        {currentContent ? (
          <ScrollArea className="h-full text-sm">
            <h2 className="text-xl font-bold mb-4">{currentContent.title}</h2>
            <div className="whitespace-pre-line">{currentContent.content}</div>
          </ScrollArea>
        ) : null}
      </div>
    </div>
  )
}

export default Content
