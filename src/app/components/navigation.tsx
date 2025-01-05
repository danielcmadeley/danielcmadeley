'use client'

import { useState } from 'react'
import { ScrollArea } from '@/components/ui/scroll-area'

type PrimaryItem = 'ABOUT' | 'WORK' | 'JOURNAL'
type SecondaryItem = 'PERSONAL' | 'EDUCATION' | 'CAREER'

export function Navigation() {
  const [selectedPrimary, setSelectedPrimary] = useState<PrimaryItem>('ABOUT')
  const [selectedSecondary, setSelectedSecondary] = useState<SecondaryItem>('PERSONAL')

  const secondaryItems: Record<PrimaryItem, SecondaryItem[]> = {
    ABOUT: ['PERSONAL', 'EDUCATION', 'CAREER'],
    WORK: ['PERSONAL', 'EDUCATION', 'CAREER'],
    JOURNAL: ['PERSONAL', 'EDUCATION', 'CAREER'],
  }

  return (
    <div className="grid grid-cols-[200px_200px_1fr] gap-8 flex-grow min-h-0">
      {/* Primary Navigation Column */}
      <div className="space-y-2">
        <div
          className={`text-sm tracking-wider cursor-pointer ${selectedPrimary === 'ABOUT' ? '[ ABOUT ]' : 'text-gray-500 hover:text-gray-400'}`}
          onClick={() => setSelectedPrimary('ABOUT')}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && setSelectedPrimary('ABOUT')}
        >
          {selectedPrimary === 'ABOUT' ? '[ ABOUT ]' : 'ABOUT'}
        </div>
        <div className="space-y-1">
          <div
            className={`text-sm tracking-wider cursor-pointer ${selectedPrimary === 'WORK' ? '[ WORK ]' : 'text-gray-500 hover:text-gray-400'}`}
            onClick={() => setSelectedPrimary('WORK')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPrimary('WORK')}
          >
            {selectedPrimary === 'WORK' ? '[ WORK ]' : 'WORK'}
          </div>
          <div
            className={`text-sm tracking-wider cursor-pointer ${selectedPrimary === 'JOURNAL' ? '[ JOURNAL ]' : 'text-gray-500 hover:text-gray-400'}`}
            onClick={() => setSelectedPrimary('JOURNAL')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedPrimary('JOURNAL')}
          >
            {selectedPrimary === 'JOURNAL' ? '[ JOURNAL ]' : 'JOURNAL'}
          </div>
        </div>
      </div>

      {/* Secondary Navigation Column */}
      <div className="space-y-2">
        {secondaryItems[selectedPrimary].map((item) => (
          <div
            key={item}
            className={`text-sm tracking-wider cursor-pointer ${selectedSecondary === item ? '[ ' + item + ' ]' : 'text-gray-500 hover:text-gray-400'}`}
            onClick={() => setSelectedSecondary(item)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setSelectedSecondary(item)}
          >
            {selectedSecondary === item ? `[ ${item} ]` : item}
          </div>
        ))}
      </div>

      {/* Content Column with ScrollArea */}
      <ScrollArea className="h-full pr-4">
        <ContentSection primaryItem={selectedPrimary} secondaryItem={selectedSecondary} />
      </ScrollArea>
    </div>
  )
}

function ContentSection({
  primaryItem,
  secondaryItem,
}: {
  primaryItem: PrimaryItem
  secondaryItem: SecondaryItem
}) {
  const content = {
    ABOUT: {
      PERSONAL: (
        <div className="prose prose-invert max-w-none">
          <p>
            Based in London, I am a design engineer with a passion for bridging the gap between
            classical mechanics and modern computing. With over a decade of experience in both
            fields, I bring a unique perspective to solving complex engineering challenges.
          </p>
          <p>
            Outside of work, I enjoy mountaineering, playing chess, and contributing to open-source
            projects that combine mechanical engineering principles with software solutions.
          </p>
          <p>
            My approach combines traditional engineering principles with cutting-edge software
            development practices. This unique perspective allows me to create innovative solutions
            that bridge the physical and digital worlds.
          </p>
          <p>
            I believe in the power of open source and regularly contribute to projects that advance
            the field of engineering software. My work often focuses on creating tools that make
            complex engineering concepts more accessible to developers and engineers alike.
          </p>
          <p>
            When not working on technical projects, I can be found in the mountains or at local tech
            meetups, sharing knowledge and experiences with fellow engineers and developers.
          </p>
        </div>
      ),
      EDUCATION: (
        <div className="prose prose-invert max-w-none">
          <h3>Academic Background</h3>
          <ul>
            <li>
              Ph.D. in Mechanical Engineering, Imperial College London
              <ul>
                <li>Thesis: &ldquo;AI-Driven Optimization in Mechanical Design&rdquo;</li>
                <li>Research Focus: Machine Learning Applications in Engineering</li>
                <li>Published 5 papers in leading journals</li>
              </ul>
            </li>
            <li>
              M.Eng. in Computing, University of Cambridge
              <ul>
                <li>Specialized in Computer Graphics and Simulation</li>
                <li>First Class Honours</li>
                <li>Led the Robotics Society</li>
              </ul>
            </li>
            <li>
              B.Eng. in Mechanical Engineering, University of Bristol
              <ul>
                <li>First Class Honours</li>
                <li>Final Year Project: Automated Design Optimization</li>
                <li>President of Engineering Society</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
      CAREER: (
        <div className="prose prose-invert max-w-none">
          <h3>Career Highlights</h3>
          <ul>
            <li>
              Lead Engineer at SpaceTech Industries (2020-Present)
              <ul>
                <li>Leading a team of 15 engineers</li>
                <li>Developed proprietary simulation software</li>
                <li>Reduced design iteration time by 60%</li>
              </ul>
            </li>
            <li>
              Senior Design Engineer at RoboticsFuture (2015-2020)
              <ul>
                <li>Led the development of autonomous systems</li>
                <li>Created innovative control algorithms</li>
                <li>Filed 3 patents for robotic systems</li>
              </ul>
            </li>
            <li>
              Research Engineer at Advanced Mechanics Lab (2012-2015)
              <ul>
                <li>Pioneered new testing methodologies</li>
                <li>Published 8 research papers</li>
                <li>Developed novel simulation techniques</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
    },
    WORK: {
      PERSONAL: (
        <div className="prose prose-invert max-w-none">
          <h3>Personal Projects</h3>
          <ul>
            <li>
              Open-source CAD System
              <ul>
                <li>AI-powered optimization engine</li>
                <li>Real-time collaboration features</li>
                <li>Web-based interface</li>
                <li>Over 1000 GitHub stars</li>
              </ul>
            </li>
            <li>
              Physics Engine
              <ul>
                <li>Real-time mechanical simulations</li>
                <li>WebGL-based visualization</li>
                <li>Used by 50+ educational institutions</li>
              </ul>
            </li>
            <li>
              Robotics Platform
              <ul>
                <li>Educational focus</li>
                <li>Visual programming interface</li>
                <li>Integrated simulation environment</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
      EDUCATION: (
        <div className="prose prose-invert max-w-none">
          <h3>Academic Projects</h3>
          <ul>
            <li>
              AI-Driven Design Optimization
              <ul>
                <li>Novel machine learning algorithms</li>
                <li>Improved efficiency by 40%</li>
                <li>Published in leading journals</li>
              </ul>
            </li>
            <li>
              Structural Analysis Algorithms
              <ul>
                <li>Real-time performance</li>
                <li>Cloud-based computation</li>
                <li>Industry collaboration</li>
              </ul>
            </li>
            <li>
              Engineering Education Software
              <ul>
                <li>Interactive 3D visualizations</li>
                <li>Adopted by 3 universities</li>
                <li>Student-focused design</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
      CAREER: (
        <div className="prose prose-invert max-w-none">
          <h3>Professional Work</h3>
          <ul>
            <li>
              Autonomous Vehicle Systems
              <ul>
                <li>Navigation algorithm development</li>
                <li>Sensor fusion implementation</li>
                <li>Real-world testing and validation</li>
              </ul>
            </li>
            <li>
              Robotic Control Systems
              <ul>
                <li>Advanced control algorithms</li>
                <li>Real-time performance optimization</li>
                <li>Safety-critical implementations</li>
              </ul>
            </li>
            <li>
              Simulation Software
              <ul>
                <li>High-fidelity physics engine</li>
                <li>Cloud-based computation</li>
                <li>Industry-standard validation</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
    },
    JOURNAL: {
      PERSONAL: (
        <div className="prose prose-invert max-w-none">
          <h3>Recent Thoughts</h3>
          <div className="space-y-6">
            <div>
              <h4>The Future of Mechanical Design</h4>
              <p>
                Exploring how AI and machine learning are transforming traditional mechanical
                engineering practices. The integration of advanced algorithms with classical
                mechanics principles is opening new possibilities in design optimization and
                validation.
              </p>
              <p>
                The convergence of computational power and engineering knowledge is creating
                unprecedented opportunities for innovation in mechanical design.
              </p>
            </div>
            <div>
              <h4>Bridging Digital and Physical</h4>
              <p>
                Thoughts on the intersection of software and mechanical engineering in modern
                product development. The growing importance of digital tools in physical engineering
                processes is reshaping how we approach design and manufacturing.
              </p>
              <p>
                The future of engineering lies in seamlessly connecting digital capabilities with
                physical systems.
              </p>
            </div>
            <div>
              <h4>Sustainable Engineering</h4>
              <p>
                Reflecting on the role of sustainable practices in modern engineering. How
                computational optimization can lead to more environmentally conscious design
                decisions.
              </p>
            </div>
          </div>
        </div>
      ),
      EDUCATION: (
        <div className="prose prose-invert max-w-none">
          <h3>Academic Publications</h3>
          <ul>
            <li>
              &ldquo;Advanced Algorithms in Mechanical Design&rdquo; - Engineering Journal 2023
              <ul>
                <li>Impact factor: 4.2</li>
                <li>Cited by 15 papers</li>
                <li>Featured in conference keynote</li>
              </ul>
            </li>
            <li>
              &ldquo;Machine Learning in Structural Analysis&rdquo; - Tech Review 2022
              <ul>
                <li>Collaborative research with MIT</li>
                <li>Novel algorithm development</li>
                <li>Industry application case study</li>
              </ul>
            </li>
            <li>
              &ldquo;The Future of Engineering Education&rdquo; - Education Quarterly 2021
              <ul>
                <li>Educational technology focus</li>
                <li>Pedagogical innovation</li>
                <li>Implementation guidelines</li>
              </ul>
            </li>
          </ul>
        </div>
      ),
      CAREER: (
        <div className="prose prose-invert max-w-none">
          <h3>Professional Updates</h3>
          <div className="space-y-6">
            <div>
              <h4>New Role at SpaceTech</h4>
              <p>
                Leading the development of next-generation propulsion systems. Our team is pushing
                the boundaries of what&apos;s possible in space technology through innovative
                engineering solutions.
              </p>
              <p>Key achievements include:</p>
              <ul>
                <li>Established new R&D division</li>
                <li>Filed 2 patents in 6 months</li>
                <li>Built international collaboration network</li>
              </ul>
            </div>
            <div>
              <h4>Industry Insights</h4>
              <p>
                Reflecting on the evolving landscape of mechanical engineering in the space
                industry. The integration of AI and traditional engineering practices is creating
                new opportunities and challenges.
              </p>
              <p>Recent developments:</p>
              <ul>
                <li>Emerging trends in space technology</li>
                <li>Sustainability in space engineering</li>
                <li>International collaboration models</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
  }

  return <div className="text-gray-300">{content[primaryItem][secondaryItem]}</div>
}
