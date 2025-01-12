import React from 'react'

const DayDisplay = () => {
  // Helper function to add ordinal suffix (st, nd, rd, th)
  const getOrdinalSuffix = (day: number) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1:
        return 'st'
      case 2:
        return 'nd'
      case 3:
        return 'rd'
      default:
        return 'th'
    }
  }

  return (
    <div>
      <h4>
        {new Date()
          .toLocaleDateString('en-US', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
          })
          .replace(/(\d+)/, (match) => `${match}${getOrdinalSuffix(parseInt(match))}`)}
      </h4>
    </div>
  )
}

export default DayDisplay
