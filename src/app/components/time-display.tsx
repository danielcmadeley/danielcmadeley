'use client'

import { useEffect, useState } from 'react'

const TimeDisplay = () => {
  const [time, setTime] = useState(new Date())

  // Add effect to update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Cleanup interval on component unmount
    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      <h4>
        {time.toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })}
      </h4>
    </div>
  )
}

export default TimeDisplay
