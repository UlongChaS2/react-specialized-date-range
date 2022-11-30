import * as React from 'react'

import { useDateContext } from '../hooks/useDateContext'

import CalendarDay from './CalendarDay'
import CalendarMonth from './CalendarMonth'
import CalendarYear from './CalendarYear'
import CalendarDecade from './CalendarDecade'

import { EUnit, ICalendarDayParentProps } from '../types/date'

export default function CalendarDate({ standard, onError }: ICalendarDayParentProps) {
  const { value: date } = useDateContext()
  const { year, month, selectedDate } = date[standard]

  return (
    <div className="calendarDateWrapper">
      {date[standard].unit === EUnit.DECADE && <CalendarDecade standard={standard} />}
      {date[standard].unit === EUnit.YEAR && <CalendarYear standard={standard} />}
      {date[standard].unit === EUnit.MONTH && <CalendarMonth standard={standard} />}
      {date[standard].unit === EUnit.DAY && (
        <CalendarDay
          standard={standard}
          year={year}
          month={month}
          selectedDate={selectedDate}
          onError={onError}
        />
      )}
    </div>
  )
}
