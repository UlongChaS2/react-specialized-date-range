import * as React from 'react'
import { useDateContext } from '../hooks/useDateContext'
import { useTranslation } from 'react-i18next'

import {
  findMonthInStr,
  findYearInStr,
  convertToDoubleDigits,
  convertToDefaultFormat,
} from '../utils/dateFormat'
import { months } from '../utils/constants/date'

import { ICalendarProps } from '../types/date'
import { useDatePickerOptionContext } from '../hooks/useDateOptionContext'

export default function CalendarMonth({ standard }: ICalendarProps) {
  const { value: date, action } = useDateContext()
  const { t } = useTranslation()
  const { value: options } = useDatePickerOptionContext()
  const { disabledDates, format } = options

  const { selectedDate, year } = date[standard]
  const selectedYear = findYearInStr(selectedDate, format)
  const selectedMonth = findMonthInStr(selectedDate, format)
  const disabledMonth = disabledDates?.map((item) =>
    convertToDefaultFormat(item, format).slice(0, -3),
  )

  const handleClickMonth = (index: number) => {
    ;(!disabledMonth ||
      (disabledMonth &&
        (`${date[standard].year}-${convertToDoubleDigits(index + 1)}` >= disabledMonth[0] ||
          !disabledMonth[0]) &&
        (`${date[standard].year}-${convertToDoubleDigits(index + 1)}` <= disabledMonth[1] ||
          !disabledMonth[1]))) &&
      action.changeMonth(standard, index)
  }

  return (
    <div className="calendarDateLargeUnitWrapper">
      {[...Array(12)].map((x, index) => (
        <div
          key={index}
          className={`calendarDateLargeUnitContent ${
            selectedMonth === index + 1 && selectedYear === year && 'highlight '
          } ${
            disabledDates &&
            disabledMonth &&
            (`${date[standard].year}-${convertToDoubleDigits(index + 1)}` < disabledMonth[0] ||
              (`${date[standard].year}-${convertToDoubleDigits(index + 1)}` > disabledMonth[1] &&
                disabledMonth[1])) &&
            'disabled'
          }`}
          onClick={() => handleClickMonth(index)}
        >
          {t(`month.${months[index]}`)}
        </div>
      ))}
    </div>
  )
}
