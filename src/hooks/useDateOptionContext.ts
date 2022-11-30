import * as React from 'react'
import { DatePickerOptionContext } from '../context/DatePickerOptionProvider'

function useDatePickerOptionContext() {
  const context = React.useContext(DatePickerOptionContext)
  if (context === undefined)
    throw new Error('useDatePickerOptionContext should be used within DateContext.Provider')

  return context
}

export { useDatePickerOptionContext }
