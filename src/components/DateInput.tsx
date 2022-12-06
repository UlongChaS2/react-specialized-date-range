import * as React from 'react'
import { useDatePickerOptionContext } from '../hooks/useDateOptionContext'
import { useDateContext } from '../hooks/useDateContext'
import { useTranslation } from 'react-i18next'

import { convertToDefaultFormat, formattingNumToDate } from '../utils/dateFormat'
import { EMode, EStandard, EType, IDateInputProps } from '../@types/date'
import { refer } from '../utils/dateOption'

export default function DateInput({ standard, setIsActive, onError }: IDateInputProps) {
  const { t } = useTranslation()
  const { value: date, action } = useDateContext()

  const { value: options } = useDatePickerOptionContext()
  const { disabledDates, placeholder, mode, format } = options

  const [text, setText] = React.useState('')

  const translateLabel = () => {
    return standard === EStandard.STARTDATE
      ? t(EStandard.STARTDATE)
      : standard === EStandard.ENDDATE
      ? t(EStandard.ENDDATE)
      : 'input'
  }

  React.useEffect(() => {
    date[standard] && setText(date[standard].selectedDate)
  }, [date[standard]])

  const handleChangeDate = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget

      if (value.length <= 10) {
        const newDate = formattingNumToDate(value, format)
        setText(newDate)
        action.changeHighlightDate(standard, newDate, format, EType.INPUT)

        try {
          if (newDate.length === 10 || !newDate) {
            const writeDate = convertToDefaultFormat(newDate, format)
            const referDate = convertToDefaultFormat(date[refer(standard)].selectedDate, format)
            const disabledDateStart = disabledDates
              ? convertToDefaultFormat(disabledDates[0], format)
              : ''
            const disabledDateEnd = disabledDates
              ? convertToDefaultFormat(disabledDates[1], format)
              : ''

            if (newDate && new Date(newDate).toString() === 'Invalid Date') {
              action.changeHighlightDate(standard, '', format, EType.INPUT)
              throw new Error(`${t('error-message.invalidDate', { label: translateLabel() })}`)
            }

            if (
              newDate &&
              !(disabledDateStart < writeDate && (writeDate < disabledDateEnd || !disabledDateEnd))
            ) {
              action.changeHighlightDate(standard, '', format, EType.INPUT)
              throw new Error(
                `${t('error-message.disabledDate', {
                  label: translateLabel(),
                })}`,
              )
            }

            if (referDate && writeDate) {
              if (standard === EStandard.STARTDATE && writeDate > referDate) {
                action.changeHighlightDate(standard, '', format, EType.INPUT)
                throw new Error(`${t('error-message.smallThan')}`)
              }

              if (standard === EStandard.ENDDATE && writeDate < referDate) {
                action.changeHighlightDate(standard, '', format, EType.INPUT)
                throw new Error(`${t('error-message.biggerThan')}`)
              }
            }
          }
        } catch (e) {
          console.error(e)
          e instanceof Error &&
            onError &&
            onError(e.message as string, { standard, value: newDate })
        }
      }
    },
    [text],
  )

  return (
    <div className="inputWrapper">
      {standard !== EStandard.SINGLE && (
        <label className="inputLabel" role="label">
          {standard === EStandard.STARTDATE
            ? `${t(EStandard.STARTDATE)}:`
            : `${t(EStandard.ENDDATE)}:`}
        </label>
      )}

      <div className="inputBasicWrapper">
        <input
          role="input"
          className="inputValue"
          type="text"
          placeholder={placeholder}
          value={text || ''}
          onChange={(e) => handleChangeDate(e)}
          onClick={() => mode === EMode.BASIC && setIsActive(true)}
        />
      </div>
    </div>
  )
}
