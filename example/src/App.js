import './App.css'
import { DatePicker } from 'react-range-date'

const datePickerProps = {
  width: '580px',
  mode: 'static',
  format: 'YYYY-MM-DD',
  value: ['', ''],
}
function App() {
  return (
    <div className="App">
      <DatePicker {...datePickerProps} />
    </div>
  )
}

export default App
