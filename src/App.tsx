import React from 'react'
import ReactDOM from 'react-dom/client'
import DatePicker from './DatePicker'
import './lang/i18n'

import './assets/styles/index.css'
import './assets/styles/initialize.css'
import './assets/styles/datePicker.css'
import { convertDateFormat } from './utils/dateFormat'

const datePickerProps = {
  width: '580px',
  mode: 'static',
  format: 'YYYY-MM-DD',
  placeholder: 'YYYY-MM-DD',
  disabledDates: ['1899-12-31', convertDateFormat()],
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <DatePicker {...datePickerProps} />
  </React.StrictMode>,
)
