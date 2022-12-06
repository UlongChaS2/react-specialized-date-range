import * as React from 'react'

import CalendarDate from './CalendarDate'
import CalendarHeader from './CalendarHeader'

import { ICalendarDayParentsProps } from '../@types/date'

export default function Calendar({ standard, onError }: ICalendarDayParentsProps) {
  return (
    <div className="calendarWrapper">
      <CalendarHeader standard={standard} />
      <CalendarDate standard={standard} onError={onError} />
    </div>
  )
}
