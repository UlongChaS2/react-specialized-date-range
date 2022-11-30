import * as React from 'react'
import { useDatePickerOptionContext } from '../hooks/useDateOptionContext'

import Calendar from './Calendar'
import DateInput from './DateInput'

import { EMode, EStandard } from '../types/date'
import { useOutsideClick } from '../hooks/useOutsideClick'
import { IDatePickerContextValues } from '../types/dateContext'
import { useDateContext } from '../hooks/useDateContext'
import { convertDateFormat, convertToDefaultFormat } from '../utils/dateFormat'

export default function DatePickerWrapper(props: IDatePickerContextValues) {
  const { value: date, action: dateActions } = useDateContext()
  const { value: options, action: optionActions } = useDatePickerOptionContext()
  const { width, height, double, mode, placement, disabledDates, format } = options

  React.useEffect(() => {
    if (props.onChange) {
      if (double) props.onChange([date.startDate.selectedDate, date.endDate.selectedDate])
      else props.onChange([date.single.selectedDate])
    }
  }, [date.startDate.selectedDate, date.endDate.selectedDate])

  React.useEffect(() => {
    optionActions.setInitOption(props)

    if (props.value[0] === undefined && props.value[1] === undefined) {
      dateActions.setSelectedDate(double, ['', ''], format)
    }

    if (
      date.startDate.selectedDate !== props.value[0] ||
      date.endDate.selectedDate !== props.value[1]
    ) {
      dateActions.setSelectedDate(double, props.value, format)
    }
  }, [props.value[0], props.value[1]])

  React.useEffect(() => {
    if (disabledDates && disabledDates[1]) {
      const convertedEndDate = convertToDefaultFormat(disabledDates[1], format).slice(0, -3)

      convertedEndDate < convertDateFormat().slice(0, -3) &&
        dateActions.setToDisabledEndDate(double, convertedEndDate)
    }
  }, [disabledDates])

  const { isActive, setIsActive, inputRef } = useOutsideClick()

  return (
    <div style={{ width, height }} className="datePickerWrapper" ref={inputRef}>
      <div className="wrapper">
        <DateInput
          standard={`${double ? EStandard.STARTDATE : EStandard.SINGLE}`}
          setIsActive={setIsActive}
          onError={props.onError}
        />
        {double && (
          <DateInput
            standard={`${double && EStandard.ENDDATE}`}
            setIsActive={setIsActive}
            onError={props.onError}
          />
        )}
      </div>

      {(mode === EMode.STATIC || (mode === EMode.BASIC && isActive)) && (
        <div className={`wrapper ${mode} ${placement}`}>
          <Calendar standard={`${double ? EStandard.STARTDATE : EStandard.SINGLE}`} />
          {double && <Calendar standard={`${double && EStandard.ENDDATE}`} />}
        </div>
      )}
    </div>
  )
}
