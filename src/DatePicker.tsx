import * as React from 'react'

import DatePickerOptionProvider from './context/DatePickerOptionProvider'
import DateProvider from './context/DateProvider'
import DatePickerErrorBoundary from './components/DatePickerErrorBoundary'
import DatePickerWrapper from './components/DatePickerWrapper'

import './lang/i18n'
import './index.css'

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
