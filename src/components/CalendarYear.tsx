import * as React from 'react'
import useYear from '../hooks/useYear'
import { useDateContext } from '../hooks/useDateContext'

import { ICalendarProps } from '../@types/date'
import {
  checkFirstDayInYear,
  checkLastDayInYear,
  convertToDefaultFormat,
  findYearInStr,
} from '../utils/dateFormat'
import { useDatePickerOptionContext } from '../hooks/useDateOptionContext'

export default function CalendarYear({ standard }: ICalendarProps) {
  const { value: date, action } = useDateContext()
  const { value: options } = useDatePickerOptionContext()
  const { disabledDates, format } = options

  const { year, selectedDate } = date[standard]
  const { years } = useYear({ year })
  const selectedYear = findYearInStr(selectedDate, format)
  const disabledYear = disabledDates?.map(
    (item) => +convertToDefaultFormat(item, format).slice(0, 4),
  )

  const handleClickYear = (year: number) => {
    if (!disabledDates || !disabledYear) return action.changeYear(standard, year)

    disabledYear[0] < year &&
      disabledYear[1] >= year &&
      !(disabledYear[0] === year && checkLastDayInYear(disabledDates[0])) &&
      !(disabledYear[1] === year && checkFirstDayInYear(disabledDates[1])) &&
      action.changeYear(standard, year)
  }

  const disabledStyleCondition = (year: number): boolean => {
    if (disabledDates && disabledYear) {
      if (
        disabledYear[0] > year ||
        (disabledYear[0] === year && checkLastDayInYear(disabledDates[0]))
      )
        return true

      if (
        disabledYear[1] < year ||
        (disabledYear[1] === year && checkFirstDayInYear(disabledDates[1]))
      )
        return true
    }

    return false
  }

  return (
    <div className="calendarDateLargeUnitWrapper">
      {years &&
        years.map((year, index) => (
          <div
            key={year}
            className={`calendarDateLargeUnitContent ${
              selectedDate && selectedYear === year && 'highlight'
            } ${(index === 0 || index === 11 || disabledStyleCondition(year)) && 'disabled'}`}
            onClick={() => handleClickYear(year)}
          >
            {year}
          </div>
        ))}
    </div>
  )
}
