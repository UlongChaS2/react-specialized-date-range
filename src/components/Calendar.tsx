import * as React from 'react'

import CalendarDate from './CalendarDate'
import CalendarHeader from './CalendarHeader'

import { ICalendarProps } from '../types/date'

export default function Calendar({ standard }: ICalendarProps) {
  return (
    <div className="calendarWrapper">
      <CalendarHeader standard={standard} />
      <CalendarDate standard={standard} />
    </div>
  )
}
