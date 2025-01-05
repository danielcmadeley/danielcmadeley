'use client'

import { useTypewriterSound } from '@/hooks/use-typewriter-sound'
import { initSmoothScroll } from '@/lib/smooth-scroll'
import { cn } from '@/lib/utils'
import { AnimatePresence, motion } from 'motion/react'
import * as React from 'react'
import { TerminalSection } from './terminal-section'

const dummyContent = {
  personal: Array(5)
    .fill(
      `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.\n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`,
    )
    .join('\n\n'),
  education: Array(4)
    .fill(
      `Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.\n\nNemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.`,
    )
    .join('\n\n'),
  usersList: Array(6)
    .fill(
      `At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.\n\nSimilique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.`,
    )
    .join('\n\n'),
  usersCreate: Array(3)
    .fill(
      `Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus.\n\nTemporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae.`,
    )
    .join('\n\n'),
  account: Array(5)
    .fill(
      `Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\n\nQuis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?`,
    )
    .join('\n\n'),
  notifications: Array(4)
    .fill(
      `Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus.\n\nOmnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet.`,
    )
    .join('\n\n'),
}

const menuItems = [
  {
    label: 'ABOUT',
    secondaryItems: [
      {
        label: 'Personal',
        href: '#personal',
        content: Array(3)
          .fill(0)
          .map((_, i) => (
            <TerminalSection
              key={i}
              title={`Personal Section ${i + 1}`}
              content={dummyContent.personal}
              index={i}
            />
          )),
      },
      {
        label: 'Education',
        href: '#education',
        content: Array(3)
          .fill(0)
          .map((_, i) => (
            <TerminalSection
              key={i}
              title={`Education Section ${i + 1}`}
              content={dummyContent.education}
              index={i}
            />
          )),
      },
    ],
  },
  {
    label: 'WORK',
    secondaryItems: [
      {
        label: 'List',
        href: '#users-list',
        content: Array(3)
          .fill(0)
          .map((_, i) => (
            <TerminalSection
              key={i}
              title={`Users List Section ${i + 1}`}
              content={dummyContent.usersList}
              index={i}
            />
          )),
      },
      {
        label: 'Create',
        href: '#users-create',
        content: Array(3)
          .fill(0)
          .map((_, i) => (
            <TerminalSection
              key={i}
              title={`Create User Section ${i + 1}`}
              content={dummyContent.usersCreate}
              index={i}
            />
          )),
      },
    ],
  },
  {
    label: 'JOURNAL',
    secondaryItems: [
      {
        label: 'Account',
        href: '#settings-account',
        content: Array(3)
          .fill(0)
          .map((_, i) => (
            <TerminalSection
              key={i}
              title={`Account Section ${i + 1}`}
              content={dummyContent.account}
              index={i}
            />
          )),
      },
      {
        label: 'Notifications',
        href: '#settings-notifications',
        content: Array(3)
          .fill(0)
          .map((_, i) => (
            <TerminalSection
              key={i}
              title={`Notifications Section ${i + 1}`}
              content={dummyContent.notifications}
              index={i}
            />
          )),
      },
    ],
  },
]

export default function SideMenu() {
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null)
  const [currentHash, setCurrentHash] = React.useState<string>('')
  const [mounted, setMounted] = React.useState(false)
  const { playSound, stopSound } = useTypewriterSound()
  const mainContentRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    setMounted(true)
    if (window.location.hash) {
      const hash = window.location.hash
      setCurrentHash(hash)
      const item = menuItems.find((item) =>
        item.secondaryItems.some((subItem) => subItem.href === hash),
      )
      if (item) {
        setSelectedItem(item.label)
      }
    }

    const { cleanup } = initSmoothScroll()

    return cleanup
  }, [])

  const handleContentChange = () => {
    stopSound()
    playSound()
    setTimeout(stopSound, 1000)
  }

  return (
    <div className="flex min-h-screen terminal-theme w-full">
      {/* Primary Menu */}
      <div className="w-25% bg-green-400">
        <nav className="space-y-2 terminal-content">
          {menuItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                if (selectedItem === item.label && !window.location.hash) {
                  setSelectedItem(null)
                } else {
                  setSelectedItem(item.label)
                }
              }}
              className={cn(
                'block w-full rounded text-sm font-medium transition-colors text-start',
                'text-neutral-500',
                selectedItem === item.label && 'text-neutral-50',
              )}
            >
              <span className="typewriter-text inline-block min-w-[120px] uppercase">
                {selectedItem === item.label ? '[ ' : '\u00A0\u00A0'}
                {item.label}
                {selectedItem === item.label ? ' ]' : '\u00A0\u00A0'}
              </span>
            </button>
          ))}
        </nav>
      </div>

      {/* Secondary Menu - Always visible */}
      <div className="w-48 bg-blue-400">
        <AnimatePresence mode="wait">
          {selectedItem && (
            <motion.nav
              key={selectedItem}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-4 terminal-content"
            >
              {menuItems
                .find((item) => item.label === selectedItem)
                ?.secondaryItems.map((subItem, index) => (
                  <motion.a
                    key={subItem.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                      opacity: 1,
                      x: 0,
                      transition: { delay: index * 0.1 },
                    }}
                    href={subItem.href}
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentHash(subItem.href)
                      history.pushState(null, '', subItem.href)
                      handleContentChange()
                    }}
                    className={cn(
                      'block rounded text-sm transition-colors text-start',
                      'text-neutral-500',
                      currentHash === subItem.href && 'text-neutral-50',
                    )}
                  >
                    <span className="typewriter-text inline-block min-w-[120px] uppercase">
                      {currentHash === subItem.href ? '[ ' : '\u00A0\u00A0'}
                      {subItem.label}
                      {currentHash === subItem.href ? ' ]' : '\u00A0\u00A0'}
                    </span>
                  </motion.a>
                ))}
            </motion.nav>
          )}
        </AnimatePresence>
      </div>

      {/* Main Content Area with Smooth Scroll */}
      <div ref={mainContentRef} className="flex-1 p-6 terminal-content bg-red-300">
        <AnimatePresence mode="wait">
          {mounted &&
            (selectedItem ? (
              <motion.div
                key={selectedItem + currentHash}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="space-y-4"
                onAnimationStart={handleContentChange}
              >
                {menuItems
                  .find((item) => item.label === selectedItem)
                  ?.secondaryItems.find((subItem) => subItem.href === currentHash)?.content ?? (
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className=" typewriter-text text-left"
                  >
                    {`> Select a secondary menu item_`}
                  </motion.div>
                )}
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className=" typewriter-text text-left"
              >
                {`> Select a menu item_`}
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  )
}
