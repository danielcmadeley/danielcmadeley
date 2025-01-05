'use client'

import Lenis from 'lenis'

export function initSmoothScroll() {
  const lenis = new Lenis({
    duration: 1.2,
    smoothWheel: true,
    wheelMultiplier: 1,
    touchMultiplier: 2,
    infinite: false,
  })

  function raf(time: number) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return {
    lenis,
    cleanup: () => {
      lenis.destroy()
    },
  }
}
