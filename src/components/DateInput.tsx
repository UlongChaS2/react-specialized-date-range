import * as React from 'react'
import { useDatePickerOptionContext } from '../hooks/useDateOptionContext'
import { useDateContext } from '../hooks/useDateContext'
import { useTranslation } from 'react-i18next'

import { convertToDefaultFormat, formattingNumToDate } from '../utils/dateFormat'
import { EMode, EStandard, EType, IDateInputProps } from '../@types/date'
import { refer } from '../utils/dateOption'

export default function DateInput({ standard, setIsActive, onError }: IDateInputProps) {
  const { t } = useTranslation()
  const inputRef = React.useRef<any>(null)
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

  const handleKeyDownDate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      e.key === 'Backspace' &&
      inputRef.current &&
      inputRef.current.selectionStart === inputRef.current.selectionEnd
    ) {
      const cursorIndex = inputRef.current.selectionStart
      if (text[text.length - 1] !== '-' && (cursorIndex === 8 || cursorIndex === 5)) {
        e.preventDefault()

        inputRef.current.setSelectionRange(
          inputRef.current.selectionStart - 1,
          inputRef.current.selectionStart - 1,
        )
      }
    }
  }

  const handleChangeDate = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget

      if (value.length <= 10) {
        const newDate = formattingNumToDate(value, format, text)
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

            if (referDate) {
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
          ref={inputRef}
          role="input"
          className="inputValue"
          type="text"
          inputMode="numeric"
          placeholder={placeholder}
          value={text || ''}
          onChange={handleChangeDate}
          onKeyDown={handleKeyDownDate}
          onClick={() => mode === EMode.BASIC && setIsActive(true)}
        />
      </div>
    </div>
  )
}
