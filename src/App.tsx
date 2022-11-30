import React from 'react'
import ReactDOM from 'react-dom/client'
import DatePicker from './DatePicker'
import './lang/i18n'

import './assets/styles/index.css'
import './assets/styles/initialize.css'
import './assets/styles/datePicker.css'

const datePickerProps = {
  width: '580px',
  mode: 'static',
  format: 'YYYY-MM-DD',
  value: ['', ''],
  disabledDates: ['1899-12-31', '2022-11-30'],
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DatePicker {...datePickerProps} />
  </React.StrictMode>,
)
