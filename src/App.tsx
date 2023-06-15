import React from 'react'
import ReactDOM from 'react-dom/client'
import DatePicker from './DatePicker'

const datePickerProps = {
  width: '580px',
  mode: 'static',
  // mode: 'basic',
  format: 'YYYY-MM-DD',
  value: ['', ''],
  disabledDates: ['1899-12-31', '2022-11-30'],
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DatePicker {...datePickerProps} />
  </React.StrictMode>,
)
