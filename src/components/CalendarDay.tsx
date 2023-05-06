import * as React from 'react'
import useDay from '../hooks/useDay'
import { useDateContext } from '../hooks/useDateContext'
import { useDatePickerOptionContext } from '../hooks/useDateOptionContext'
import { useTranslation } from 'react-i18next'

import { weekDays } from '../utils/constants/date'
import { refer } from '../utils/dateOption'
import { convertToDefaultFormat } from '../utils/dateFormat'
import { EStandard, EType, ICalendarDayProps, IDay } from '../@types/date'

export default function CalendarDay({ standard, year, month, onError }: ICalendarDayProps) {
  const { t, i18n } = useTranslation()
  const { value: date, action } = useDateContext()
  const { value: option } = useDatePickerOptionContext()
  const { disabledDates, locale = i18n.language, startDayOfWeek, format } = option
  const formattingDisabledDates = disabledDates?.map((item) => convertToDefaultFormat(item, format))

  const reorderWeekDays =
    startDayOfWeek && startDayOfWeek !== 'Sunday'
      ? weekDays
          .slice(weekDays.indexOf(startDayOfWeek), weekDays.length)
          .concat(weekDays.slice(0, weekDays.indexOf(startDayOfWeek)))
      : weekDays

  const { days } = useDay({ year, month, locale, reorderWeekDays, format })

  const handleClickDay = (day: string) => {
    try {
      const selecteDay = convertToDefaultFormat(day, format)
      const referDate = convertToDefaultFormat(date[refer(standard)].selectedDate, format)

      if (referDate) {
        if (standard === EStandard.STARTDATE && day > referDate) {
          action.changeHighlightDate(standard, '', format, EType.CALENDAR)
          throw new Error(`${t('error-message.smallThan')}`)
        }

        if (standard === EStandard.ENDDATE && day < referDate) {
          action.changeHighlightDate(standard, '', format, EType.CALENDAR)
          throw new Error(`${t('error-message.biggerThan')}`)
        }
      }

      if (
        !formattingDisabledDates ||
        ((!formattingDisabledDates[0] || formattingDisabledDates[0] < selecteDay) &&
          (!formattingDisabledDates[1] || selecteDay < formattingDisabledDates[1]))
      )
        return action.changeHighlightDate(standard, day, format, EType.CALENDAR)
    } catch (e) {
      e instanceof Error && onError && onError(e.message as string, { standard, value: day })
    }
  }

  const rangeStyle = (day: string) => {
    const startSelected = convertToDefaultFormat(date.startDate.selectedDate, format)
    const endSelected = convertToDefaultFormat(date.endDate.selectedDate, format)
    const dayEl = convertToDefaultFormat(day, format)

    return (
      date.startDate.selectedDate.length >= 10 &&
      date.endDate.selectedDate.length >= 10 &&
      startSelected < dayEl &&
      dayEl < endSelected
    )
  }

  const disabledStyle = (day: IDay) => {
    return (
      day.isCurrentDay !== 'thisMonth' ||
      (formattingDisabledDates &&
        formattingDisabledDates[0] >= convertToDefaultFormat(day.date, format)) ||
      (formattingDisabledDates &&
        convertToDefaultFormat(day.date, format) >= formattingDisabledDates[1] &&
        formattingDisabledDates[1])
    )
  }

  return (
    <div>
      <div className="calendarDateDayUnitWrapper">
        {reorderWeekDays.map((day, index) => (
          <div className="calendarDateDayUnitHeader" key={index}>
            {t(`weekDays.${day}`)}
          </div>
        ))}
      </div>

      <div className="calendarDateDayUnitContentWrapper">
        {days &&
          days.map((day, index) => (
            <div
              className={`calendarDateDayUnitContent ${
                (date[standard].selectedDate === day.date ||
                  date[refer(standard)].selectedDate === day.date) &&
                'highlight'
              } ${rangeStyle(day.date) && 'range'} ${
                day.weekday === t('weekDays.Saturday') && 'saturday'
              } ${day.weekday === t('weekDays.Sunday') && 'sunday'} ${
                disabledStyle(day) && 'disabled'
              }`}
              key={index}
              onClick={() => handleClickDay(day.date)}
            >
              {day.value}
            </div>
          ))}
      </div>
    </div>
  )
}
