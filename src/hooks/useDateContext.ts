import * as React from 'react'
import { DateContext } from '../context/DateProvider'

function useDateContext() {
  const context = React.useContext(DateContext)

  if (context === undefined)
    throw new Error('useDateContext should be used within DateContext.Provider')

  return context
}

export { useDateContext }
