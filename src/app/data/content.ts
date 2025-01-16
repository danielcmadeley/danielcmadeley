export type ContentSection = {
  title: string
  content: string[]
  category?: ProjectCategory
  url?: string
  skills?: {
    category: string
    items: string[]
  }[]
}

type ProjectCategory = 'software' | 'structural'

type JournalEntry = ContentSection & {
  date: string
  readingTime: string
  excerpt: string
  tags: string[]
}

type ContentData = {
  about: {
    background: ContentSection
    skills: ContentSection
    education: ContentSection
  }
  projects: {
    [key: string]: ContentSection
  }
  journal: {
    [key: string]: JournalEntry
  }
}

export const contentData: ContentData = {
  about: {
    background: {
      title: 'Background',
      content: [
        ' My passion for engineering ignited when I first experienced the magic of 3D printing at school. I designed and crafted a portable speaker using Solidworks, marking the beginning of my hands-on journey in engineering. At the age of 13, I received my first laptop, which opened the door to the world of programming. I started with Scratch, then progressed to JavaScript and Python, creating my own games and exploring the limitless possibilities of code.',
        ' Driven by curiosity and a thirst for knowledge, I delved into the realms of mathematics, physics, and history. These subjects not only broadened my perspective but also laid a strong foundation for my future in engineering. My academic pursuits led me to pursue a degree in civil engineering at university, where my passion for engineering transformed into an unwavering obsession.',
        '  Through my experiences, I have developed a deep appreciation for the power of engineering to shape the world around us. I am excited to continue my journey, pushing the boundaries of what is possible and creating innovative solutions that make a positive impact on society.',
      ],
    },
    skills: {
      title: 'Skills',
      content: [
        ' My unique skill set encompasses both structural engineering and software development, empowering me to approach projects from diverse perspectives. Since 2019, I have pursued these disciplines in parallel, honing my expertise in each field. In 2021, I embarked on my journey as a freelance developer while simultaneously working professionally as a structural engineer. This dual path has solidified my vision for the future: to excel as a computational designer.',
        'By seamlessly integrating my knowledge of structural engineering and software development, I am well-equipped to tackle complex challenges and deliver innovative solutions. My passion for both fields drives me to continuously learn and adapt, ensuring that I remain at the forefront of the industry.',
        'As a computational designer, I aim to leverage my skills to create groundbreaking designs that push the boundaries of what is possible. I am excited to collaborate with like-minded professionals and contribute to projects that have a lasting impact on the built environment.',
      ],
      skills: [
        {
          category: 'Software Development',
          items: [
            'TypeScript',
            'JavaScript',
            'Python',
            'React',
            'Next.js',
            'Node.js',
            'Pandas',
            'NumPy',
            'Matplotlib',
            'SQL',
            'NoSQL Databases',
            'REST APIs',
            'GraphQL',
            'Langchain',
            'Cloud Services (AWS, GCP)',
            'GSAP',
            'Lenis',
            'Motion',
            'CMS',
          ],
        },
        {
          category: 'Engineering',
          items: ['Rhino3D', 'Tekla Structural Designer', 'Tedds', 'Grasshopper', 'FreeCAD'],
        },
        {
          category: 'Design',
          items: ['Figma', 'Adobe Creative Suite', 'Blender', 'Rive'],
        },
      ],
    },
    education: {
      title: 'Education',
      content: [
        'BEng Civil Engineering - Leeds Beckett University (2019-2022)',
        'Upper Second Class Honours (2:1)',
        'Engineering Skills - Structural Engineering Course',
        '- Learned to leverage Python and Blender as structural analysis tools',
        'Codewithantonio - Full Stack Development Program',
        '- Gained skills to build applications similar to Notion and Google Docs',
        'Zero to Fullstack Hero - Fullstack Course',
        '- Covered React, Next.js, REST APIs, GraphQL, and more',
        'DataCamp - Data Science Course',
        '- Explored data science concepts and techniques',
        'Boot.dev - Backend Development Course',
        '- Studied GIT, Linux, Python, JavaScript, Golang, Algorithms, and Data Structures',
      ],
    },
  },
  projects: {
    'smart-inventory-system': {
      title: 'Smart Inventory Management System',
      category: 'software',
      url: 'https://github.com/yourusername/smart-inventory',
      content: [
        'Developed a full-stack inventory management system using React, Node.js, and MongoDB',
        'Implemented real-time tracking with WebSocket integration for live updates across multiple warehouses',
        'Reduced inventory discrepancies by 45% and improved order fulfillment speed by 60%',
        'Integrated barcode scanning functionality and automated reporting systems',
      ],
    },
    'predictive-maintenance-app': {
      title: 'Industrial IoT Predictive Maintenance Platform',
      category: 'software',
      url: 'https://github.com/yourusername/predictive-maintenance',
      content: [
        'Created a machine learning-powered predictive maintenance system using Python and TensorFlow',
        'Developed REST APIs for real-time sensor data collection and analysis',
        'Implemented anomaly detection algorithms reducing equipment downtime by 35%',
        'Designed an intuitive dashboard for maintenance scheduling and alert management',
      ],
    },
    'blockchain-supply-chain': {
      title: 'Blockchain Supply Chain Tracker',
      category: 'software',
      content: [
        'Built a supply chain tracking system using Ethereum smart contracts and Web3.js',
        'Implemented product authenticity verification and real-time tracking features',
        'Created a responsive front-end interface using Next.js and Tailwind CSS',
        'Integrated QR code generation for easy product tracking',
      ],
    },
    'automated-testing-framework': {
      title: 'Automated Testing Framework',
      category: 'software',
      content: [
        'Developed a comprehensive testing framework using Jest and Cypress',
        'Implemented CI/CD pipeline integration with GitHub Actions',
        'Reduced testing time by 70% while increasing test coverage to 95%',
        'Created detailed documentation and training materials for team adoption',
      ],
    },
    'bridge-structural-analysis': {
      title: 'Suspension Bridge Structural Analysis',
      category: 'structural',
      content: [
        'Conducted comprehensive structural analysis of a 500m suspension bridge',
        'Performed finite element analysis using ANSYS to optimize cable design',
        'Developed load-bearing calculations for various weather conditions',
        'Created detailed technical documentation and construction recommendations',
      ],
    },
    'seismic-resistant-design': {
      title: 'Seismic-Resistant Building Design',
      category: 'structural',
      content: [
        'Designed a 30-story building with advanced seismic resistance features',
        'Implemented base isolation systems and dynamic dampers',
        'Conducted time-history analysis for various earthquake scenarios',
        'Optimized structural components for both safety and cost-effectiveness',
      ],
    },
    'composite-material-structure': {
      title: 'Composite Material Aviation Structure',
      category: 'structural',
      content: [
        'Designed lightweight composite structures for aircraft components',
        'Performed fatigue analysis and stress testing simulations',
        'Optimized material layup for maximum strength-to-weight ratio',
        'Developed manufacturing guidelines for composite assembly',
      ],
    },
    'renewable-energy-structure': {
      title: 'Offshore Wind Turbine Foundation',
      category: 'structural',
      content: [
        'Designed monopile foundations for offshore wind turbines',
        'Analyzed wave loading and dynamic response characteristics',
        'Performed soil-structure interaction studies',
        'Developed installation and maintenance procedures',
      ],
    },
  },
  journal: {
    'building-a-design-system': {
      title: 'Building a Design System from Scratch',
      date: '2024-03-15',
      readingTime: '8 min read',
      excerpt:
        'A deep dive into creating a consistent and scalable design system for modern web applications...',
      tags: ['Design Systems', 'UI/UX', 'Frontend'],
      content: [
        'Design systems have become an essential part of modern web development. They provide consistency, improve development speed, and ensure a cohesive user experience across all platforms.',
        'In this article, I will share my experience building a design system from the ground up, including the challenges faced and lessons learned along the way.',
        // Add more paragraphs as needed
      ],
    },
    'machine-learning-in-structural-engineering': {
      title: 'Machine Learning Applications in Structural Engineering',
      date: '2024-03-01',
      readingTime: '12 min read',
      excerpt:
        'Exploring how AI and machine learning are revolutionizing structural engineering practices...',
      tags: ['Machine Learning', 'Engineering', 'AI'],
      content: [
        'The intersection of machine learning and structural engineering is creating new opportunities for innovation in building design and analysis.',
        'From predictive maintenance to optimization of structural components, AI is transforming how we approach engineering challenges.',
        // Add more paragraphs as needed
      ],
    },
    'future-of-sustainable-architecture': {
      title: 'The Future of Sustainable Architecture',
      date: '2024-02-15',
      readingTime: '10 min read',
      excerpt:
        'Investigating emerging trends in sustainable architecture and their impact on urban development...',
      tags: ['Architecture', 'Sustainability', 'Urban Planning'],
      content: [
        'Sustainable architecture is no longer just a trend – its becoming a necessity in our fight against climate change.',
        'This post explores innovative approaches to sustainable building design and the technologies making it possible.',
        // Add more paragraphs as needed
      ],
    },
    'coding-best-practices': {
      title: 'Modern Coding Best Practices for Engineers',
      date: '2024-02-01',
      readingTime: '6 min read',
      excerpt:
        'Essential coding practices every engineer should know when transitioning to software development...',
      tags: ['Programming', 'Best Practices', 'Software Engineering'],
      content: [
        'As engineering becomes increasingly software-driven, understanding coding best practices is crucial for modern engineers.',
        'Here are the key principles and practices Ive learned during my transition from mechanical engineering to software development.',
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
        'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.',
      ],
    },
  },
}
