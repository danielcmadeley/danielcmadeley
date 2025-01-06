'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'

// Content data structure
const contentData = {
  // About section
  'about/background': {
    title: 'Background',
    content: `Born and raised in the intersection of engineering and technology, 
    I've always been fascinated by the way things work... Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa numquam distinctio nihil exercitationem aut! At quia nobis inventore error consequuntur incidunt accusantium nesciunt dolores delectus. Perspiciatis laboriosam omnis nostrum voluptates!
    Quis nihil a odio sit modi quas excepturi corporis eligendi obcaecati, error sequi animi tempore consectetur reiciendis quaerat consequatur qui dolore autem nesciunt? Asperiores officia beatae consectetur at labore quas!
    Mollitia delectus laudantium harum tenetur, dolor, excepturi veniam rem exercitationem alias officia ipsam molestias quam amet beatae omnis voluptatum ipsum, ut quia quo nulla esse provident. Accusantium laborum libero incidunt.
    Laborum voluptatem consequuntur qui earum sunt, asperiores quia aperiam doloribus officiis excepturi harum? Facere explicabo officia dolor atque exercitationem quo optio alias placeat qui corrupti. Doloribus aliquam omnis magni porro.
    Veritatis corrupti at optio cupiditate velit consectetur architecto amet vel quam, repellendus molestiae cumque recusandae vero mollitia quis, vitae dolorem! Animi deserunt asperiores omnis incidunt ducimus dolorum, totam fuga magni?
    Ut nulla quae ipsam, at eius repudiandae iure odio fuga tempore commodi est ab assumenda culpa, maxime, fugit atque non labore quo sequi inventore illo ullam esse quasi nisi. Facere?
    Dolores, suscipit aut mollitia consequuntur dolor provident quidem nam veritatis reiciendis! Nostrum, officia adipisci commodi reprehenderit esse, dolorum quod ad hic maiores aut qui nobis alias modi vitae laudantium eos.
    Quia, dolor. Veniam iste consequuntur a sequi soluta quisquam fugit tenetur dolorum aperiam ut eaque quis, et aliquid nisi ab minus sunt, assumenda accusamus enim excepturi animi accusantium qui! Nesciunt.
    Temporibus culpa natus est voluptates aut quo optio omnis perspiciatis enim blanditiis eaque recusandae numquam veniam sit, perferendis corporis, ipsa ipsum excepturi deleniti adipisci. Fuga dignissimos adipisci quia animi accusamus!
    Qui, minima? Enim vel, dolorum optio molestias harum odit id labore natus iure? Numquam corrupti ad ratione nihil voluptates expedita natus deserunt, non nobis consequatur alias ipsum nostrum adipisci laborum.
    Voluptatum minima ullam amet aliquid beatae, facere debitis recusandae sequi atque impedit repudiandae, ipsum, soluta quas ipsa voluptate quasi totam? Atque, distinctio facere! Hic vitae aliquam ipsum officia debitis? Voluptatem.
    Ipsum consectetur qui odit perspiciatis totam voluptatibus magnam, pariatur culpa autem explicabo. Dolorem non odio doloribus nisi quae magni, nesciunt sit ducimus veritatis? Itaque aliquam accusantium quod optio, qui ipsum!
    Itaque, perferendis quo beatae recusandae nesciunt vero, sapiente hic quae reprehenderit corrupti facilis harum, temporibus illum! Aliquam dolorum deleniti error minus necessitatibus omnis mollitia obcaecati unde reiciendis rerum, ea consequuntur.
    Totam non rerum, inventore doloribus nihil dolores et ut alias accusantium a quaerat ipsa odit similique unde dolor debitis quas hic. Laboriosam at inventore aperiam repellat quos cum molestiae facere!
    Amet tenetur omnis voluptates adipisci eum molestias accusantium fugiat libero obcaecati, officiis aliquam, sed provident facilis explicabo voluptate quae non aspernatur nihil ab maiores enim inventore voluptatibus. Incidunt, ducimus mollitia.
    Ab culpa quo veniam aperiam! Molestiae, culpa quod! Consectetur voluptatum recusandae maxime. Ratione illum incidunt, rerum accusantium quod cum, laudantium in eveniet tempore distinctio doloribus, voluptatum maxime et sunt ex.
    Eaque doloremque repudiandae possimus nisi dicta cupiditate earum cum a, vel unde, optio magnam. Ab at eveniet, provident ullam non aliquam architecto tenetur in doloribus, assumenda quisquam nobis dolorem aut!
    Harum mollitia rerum laborum quam pariatur dolorem, ullam aut culpa voluptatum vero eligendi neque repudiandae nam, molestiae tempora necessitatibus alias. Atque quia veniam, qui ab molestias ea ullam quos accusamus.
    Maxime doloremque beatae, voluptatem tempore natus vel ex voluptates illo non optio dolorem deserunt voluptas consequatur nobis eius architecto iure eaque neque. Vitae ex quod excepturi autem blanditiis! Suscipit, vel!
    Ad odit similique iusto aliquam doloremque animi. Temporibus natus optio ad incidunt ullam ut non reprehenderit voluptate esse perferendis consequuntur a placeat totam nihil, velit dolores culpa iusto enim quidem!
    Possimus, nihil placeat! Debitis doloribus vitae eum. Beatae repellat quidem laborum error laboriosam fugiat doloribus architecto expedita hic omnis quisquam atque, velit quia nemo nam totam dolorem dolore cumque cupiditate?
    Eligendi atque praesentium commodi dolorem iste ex voluptates natus ipsa itaque sed? Pariatur, quia, libero, dignissimos voluptas nemo reiciendis quasi provident iure quis consequuntur accusamus doloribus nihil deserunt quaerat nulla.
    Tenetur tempore ea tempora commodi deleniti quasi animi incidunt eos voluptate esse modi facere iste in laudantium, aut vel minima labore dicta deserunt? Soluta quam, veritatis magni cupiditate maiores ipsam.
    Deserunt corporis voluptate eaque, tenetur eos unde quisquam reprehenderit sit necessitatibus temporibus expedita, enim odit exercitationem excepturi? Aliquam tempora magnam quis rerum error, maiores beatae, sint consequatur impedit doloribus exercitationem?
    Qui ullam quis esse assumenda dicta eveniet magnam molestiae sit, deleniti et quas, laboriosam omnis! Tenetur repellendus, odio veritatis fugiat esse dolorum, similique expedita mollitia recusandae aut magni reprehenderit necessitatibus.
    Velit pariatur eaque illo facere non iure fugiat eum magnam. Facere totam repudiandae id. Culpa quas dolores, ducimus repudiandae, ad perspiciatis expedita deserunt praesentium fuga quod in obcaecati esse minima!
    Id adipisci quae repudiandae harum, quis odio impedit eaque? Veniam nam esse quaerat omnis. Repudiandae earum ab nulla fugiat qui veniam, animi facere aut obcaecati. Libero, voluptates. Qui, totam obcaecati?
    Adipisci incidunt eligendi doloribus excepturi debitis dolores delectus id voluptatum alias recusandae autem quasi, porro obcaecati neque, cupiditate exercitationem voluptate sit error tenetur quis molestiae. Quas laboriosam adipisci fuga dicta.
    Impedit non minus alias debitis mollitia consequatur, repudiandae hic perspiciatis nobis nihil quidem, consequuntur recusandae velit? Exercitationem esse delectus inventore iure praesentium. Modi ullam eos ut quis necessitatibus saepe atque!
    Accusamus soluta saepe voluptates autem sequi? Ex perferendis harum distinctio vitae voluptatem! Nam vitae id omnis eaque aliquid repellendus explicabo eum dicta qui praesentium, dignissimos quis officia inventore reprehenderit modi?`,
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
  const searchParams = useSearchParams()
  const path = searchParams.get('path')
  const [currentPath, setCurrentPath] = useState<string | null>(path)
  const currentContent = currentPath ? contentData[currentPath as keyof typeof contentData] : null

  // Update currentPath when searchParams changes
  useEffect(() => {
    setCurrentPath(path)
  }, [path])

  // Clear URL parameters and content on mount
  useEffect(() => {
    if (window.location.search) {
      window.history.replaceState({}, '', '/')
      setCurrentPath(null)
    }
  }, [])

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
