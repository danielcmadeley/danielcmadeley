export type ContentSection = {
  title: string
  content: string[]
  skills?: {
    category: string
    items: string[]
  }[]
}

type ContentData = {
  about: {
    background: ContentSection
    skills: ContentSection
    education: ContentSection
  }
  projects: {
    'project-1': ContentSection
    'project-2': ContentSection
  }
  journal: {
    'entry-1': ContentSection
    'entry-2': ContentSection
  }
}

export const contentData: ContentData = {
  about: {
    background: {
      title: 'Background',
      content: [
        'With a unique blend of mechanical engineering expertise and software development skills, I bridge the gap between physical systems and digital solutions.',
        'My journey began in mechanical engineering, where I developed a strong foundation in classical mechanics, thermodynamics, and system design. This background gives me a distinctive perspective in approaching software development, especially in areas where physical and digital systems intersect.',
        'Today, I focus on creating innovative solutions that leverage both my engineering background and programming expertise to solve complex real-world challenges.',
      ],
    },
    skills: {
      title: 'Skills',
      content: [
        'My skill set spans both mechanical engineering and software development, allowing me to tackle projects from multiple angles.',
      ],
      skills: [
        {
          category: 'Software Development',
          items: [
            'TypeScript/JavaScript',
            'React & Next.js',
            'Node.js',
            'Python',
            'SQL & NoSQL Databases',
            'REST APIs',
            'Cloud Services (AWS, GCP)',
          ],
        },
        {
          category: 'Engineering',
          items: [
            'CAD/CAM Software',
            'Finite Element Analysis',
            'Thermal Analysis',
            'Manufacturing Processes',
            'Project Management',
            'Technical Documentation',
          ],
        },
      ],
    },
    education: {
      title: 'Education',
      content: [
        'MEng Mechanical Engineering - University of Bristol (2019-2023)',
        'First Class Honours',
        'Specialized in Computational Methods and Digital Manufacturing',
        'Final Year Project: Development of an AI-powered predictive maintenance system for industrial equipment',
        'Key coursework included Advanced Mathematics, Thermodynamics, Control Systems, and Programming for Engineers',
      ],
    },
  },
  projects: {
    'project-1': {
      title: 'Project 1',
      content: ['Description of project 1...', 'Technical details...', 'Outcomes and impact...'],
    },
    'project-2': {
      title: 'Project 2',
      content: ['Description of project 2...', 'Technical details...', 'Outcomes and impact...'],
    },
  },
  journal: {
    'entry-1': {
      title: 'Entry 1',
      content: ['Journal entry 1 content...', 'More paragraphs...'],
    },
    'entry-2': {
      title: 'Entry 2',
      content: ['Journal entry 2 content...', 'More paragraphs...'],
    },
  },
}
