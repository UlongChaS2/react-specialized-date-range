import React from 'react'
import i18n from '../lang/i18n'
import { checkSetFormatRegExr, convertToDefaultFormat } from '../utils/dateFormat'

export default function DatePickerErrorBoundary(props: any) {
  const { locale, disabledDates, format, value } = props

  React.useEffect(() => {
    locale && i18n.language !== locale && i18n.changeLanguage(locale)
  }, [locale])

  React.useEffect(() => {
    if (disabledDates) {
      const disabledDatesStart = checkSetFormatRegExr(format, disabledDates[0])
      const disabledDatesEnd = checkSetFormatRegExr(format, disabledDates[1])

      // NOTE: Error 관리 - format 구분자와 disabledDates의 배열 원소들의 구분자가 달랐을 때 나오는 error
      if (!disabledDatesStart || !disabledDatesEnd)
        throw new Error('Set disabledDates according to the format you set.')

      // NOTE: Error 관리 - disabledStartDate를 value보다 크게 지정했을 때 error? 빈배열로?

      if (
        value[0] &&
        convertToDefaultFormat(disabledDates[0], format) > convertToDefaultFormat(value[0], format)
      )
        throw new Error('Set value greater than disabledStartDate')

      // NOTE: Error 관리 - disabledEndDate를 endValue보다 작게 지정했을 때 error? 빈배열로?
      if (
        value[1] &&
        convertToDefaultFormat(disabledDates[1], format) < convertToDefaultFormat(value[1], format)
      )
        throw new Error('Set value smaller than disabledEndDate')
    }
  }, [disabledDates])

  React.useEffect(() => {
    const valueStart = checkSetFormatRegExr(format, value[0])
    const valueEnd = checkSetFormatRegExr(format, value[1])

    // NOTE: Error 관리 - format 구분자와 value의 배열 원소들의 구분자가 달랐을 때 나오는 error
    if (value[0].length >= 10 && value[1].length >= 10 && (!valueStart || !valueEnd))
      throw new Error('Set value according to the format you set.')
  }, [value])

  return <div>{props.children}</div>
}
