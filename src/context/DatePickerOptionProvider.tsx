import * as React from 'react'
import { IDatePickerContext, IDatePickerContextValues } from '../types/dateContext'
import { initialDateOptionState, initialDatePicker } from '../utils/constants/initialContext'

export const DatePickerOptionContext = React.createContext<IDatePickerContext>(initialDatePicker)

const DatePickerOptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [option, setOption] = React.useState<IDatePickerContextValues>(initialDateOptionState)

  const actions = React.useMemo(
    () => ({
      setInitOption(option: IDatePickerContextValues) {
        setOption((prev) => ({ ...prev, ...option }))
      },
    }),
    [],
  )

  return (
    <DatePickerOptionContext.Provider value={{ value: option, action: actions }}>
      {children}
    </DatePickerOptionContext.Provider>
  )
}

export default DatePickerOptionProvider
