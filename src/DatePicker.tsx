import * as React from 'react'
import DatePickerOptionProvider from './context/DatePickerOptionProvider'
import DateProvider from './context/DateProvider'
import DatePickerWrapper from './components/DatePickerWrapper'
import DatePickerErrorBoundary from './components/DatePickerErrorBoundary'

function DatePicker(props: any) {
  return (
    <DatePickerOptionProvider>
      <DateProvider>
        <DatePickerErrorBoundary {...props}>
          <DatePickerWrapper {...props} />
        </DatePickerErrorBoundary>
      </DateProvider>
    </DatePickerOptionProvider>
  )
}

export default DatePicker
