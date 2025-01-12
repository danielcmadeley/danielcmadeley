'use server'

import { cookies } from 'next/headers'

export async function checkFirstVisit() {
  const cookieStore = await cookies()
  const hasVisited = cookieStore.has('hasVisited')
  if (!hasVisited) {
    cookieStore.set('hasVisited', 'true', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365, // 1 year
    })
  }
  return !hasVisited
}
