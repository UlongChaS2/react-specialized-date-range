import * as React from 'react'

import CalendarDate from './CalendarDate'
import CalendarHeader from './CalendarHeader'

import { ICalendarDayParentProps } from '../types/date'

export default function Calendar({ standard, onError }: ICalendarDayParentProps) {
  return (
    <div className="calendarWrapper">
      <CalendarHeader standard={standard} />
      <CalendarDate standard={standard} onError={onError} />
    </div>
  )
}
