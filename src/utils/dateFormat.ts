import i18n from '../lang/i18n'
import { ELanguage, EUnit } from '../@types/date'
import { months, thisDay, thisMonth, thisYear } from './constants/date'

export const getWeekday = (year: number, month: number, day: number, locale: string) => {
  return new Date(year, month, day).toLocaleString(locale, {
    weekday: 'short',
  })
}

export const convertToDoubleDigits = (date: number): string => {
  return date >= 10 ? String(date) : `0${date}`
}

export const convertDateFormat = (
  year: number = thisYear,
  month: number = thisMonth,
  day: number = thisDay,
  format: string = 'YYYY-MM-DD',
): string => {
  const formatSeparator = findSpecialCharacterStr(format)

  if (checkYYYYMMDD(format)) return dateFormatYYYYMMDD(year, month, day, formatSeparator)
  else if (checkMMDDYYYY(format)) return dateFormatMMDDYYYY(year, month, day, formatSeparator)
  else return dateFormatDDMMYYYY(year, month, day, formatSeparator)
}

export const dateFormatYYYYMMDD = (
  year: number,
  month: number,
  day: number,
  formatSeparator: string,
): string => {
  return `${year}${formatSeparator}${convertToDoubleDigits(
    month,
  )}${formatSeparator}${convertToDoubleDigits(day)}`
}

export const dateFormatMMDDYYYY = (
  year: number,
  month: number,
  day: number,
  formatSeparator: string,
): string => {
  return `${convertToDoubleDigits(month)}${formatSeparator}${convertToDoubleDigits(
    day,
  )}${formatSeparator}${year}`
}

export const dateFormatDDMMYYYY = (
  year: number,
  month: number,
  day: number,
  formatSeparator: string,
): string => {
  return `${convertToDoubleDigits(day)}${formatSeparator}${convertToDoubleDigits(
    month,
  )}${formatSeparator}${year}`
}

const translateTitleToKo = (year: number, month: number) => `${year} ${month}월`
const translateTitleToEn = (year: number, month: number) => `${months[month - 1]} ${year}`
const translateTitleToJa = (year: number, month: number) => `${year}年 ${month}月`

export const convertTitleToUnit = (
  unit: string,
  year: number,
  month: number,
  locale: string = i18n.language,
) => {
  if (unit === EUnit.DECADE) return `${year}-${year < 0 ? year - 90 : year + 90}`
  if (unit === EUnit.YEAR) return `${year}-${year < 0 ? year - 9 : year + 9}`
  if (unit === EUnit.MONTH) return `${year}`
  if (unit === EUnit.DAY) {
    if (locale === ELanguage.KO) return translateTitleToKo(year, month)
    if (locale === ELanguage.EN) return translateTitleToEn(year, month)
    if (locale === ELanguage.JA) return translateTitleToJa(year, month)
  }
}

export const checkYYYYMMDD = (format: string) => format.startsWith('Y') || format.startsWith('y')
export const checkDDMMYYYY = (format: string) => format.startsWith('D') || format.startsWith('d')
export const checkMMDDYYYY = (format: string) => format.startsWith('M') || format.startsWith('m')

export const findSpecialCharacterStr = (format: string): string => {
  const RegNumOrStr = /[0-9a-zA-Z]/g
  return format.replace(RegNumOrStr, '').substring(0, 1)
}

export const findYearInStr = (date: string, format: string = 'YYYY-MM-DD'): number => {
  if (!date) return findYearInStr(convertDateFormat())
  if (checkYYYYMMDD(format)) return +date.split(findSpecialCharacterStr(format))[0]
  else return +date.split(findSpecialCharacterStr(format))[2]
}

export const findMonthInStr = (date: string, format: string = 'YYYY-MM-DD'): number => {
  if (!date) return findMonthInStr(convertDateFormat())
  if (checkMMDDYYYY(format)) return +date.split(findSpecialCharacterStr(format))[0]
  else return +date.split(findSpecialCharacterStr(format))[1]
}

export const findDayInStr = (date: string, format: string = 'YYYY-MM-DD'): number => {
  if (checkYYYYMMDD(format)) return +date.split(findSpecialCharacterStr(format))[2]
  else if (checkMMDDYYYY(format)) return +date.split(findSpecialCharacterStr(format))[1]
  else return +date.split(findSpecialCharacterStr(format))[0]
}

export const findDecadeInYear = (year: string | number): string => {
  return String(year).slice(0, 3)
}

export const convertToDefaultFormat = (value: string | null, format: string): string => {
  if (value === null) return ''
  if (checkYYYYMMDD(format) || value === '') return value

  const num = replaceOnlyNum(value)
  let RegDateFmt: RegExp | string = ''
  let DataFormat: string = ''

  if (checkDDMMYYYY(format)) {
    RegDateFmt = /([0-9]{2})([0-9]{2})([0-9]+)/
    DataFormat = `$3${findSpecialCharacterStr(value)}$2${findSpecialCharacterStr(value)}$1`
  } else {
    RegDateFmt = /([0-9]{2})([0-9]{2})([0-9]+)/
    DataFormat = `$3${findSpecialCharacterStr(value)}$1${findSpecialCharacterStr(value)}$2`
  }

  return num.replace(RegDateFmt, DataFormat)
}

export const replaceOnlyNum = (value: string): string => {
  const RegNotNum = /[^0-9]/g
  return value.replace(RegNotNum, '')
}

export const formattingNumToDate = (value: string, format: string, textDate: string): string => {
  const onlyNum = replaceOnlyNum(value)
  const formatSeparator = findSpecialCharacterStr(format)

  let DataFormat: string = ''
  let RegDateFmt: RegExp | string = ''

  if (
    onlyNum.length === 4 &&
    value.length === 4 &&
    textDate.length === 3 &&
    textDate.substring(textDate.length - 1) !== formatSeparator &&
    value.substring(0, 1) !== formatSeparator
  ) {
    DataFormat = `$1${formatSeparator}`
    RegDateFmt = /([0-9]{4})/
    return onlyNum.replace(RegDateFmt, DataFormat)
  }

  if (
    onlyNum.length === 5 &&
    value.length === 5 &&
    textDate.length === 4 &&
    textDate.substring(textDate.length - 1) !== formatSeparator &&
    value.substring(0, 1) !== formatSeparator
  ) {
    DataFormat = `$1${formatSeparator}`
    RegDateFmt = /([0-9]{4})/
    return onlyNum.replace(RegDateFmt, DataFormat)
  }

  if (
    onlyNum.length === 6 &&
    value.length === 7 &&
    textDate.length === 6 &&
    textDate.substring(textDate.length - 1) !== formatSeparator
  ) {
    DataFormat = `$1${formatSeparator}$2${formatSeparator}`
    RegDateFmt = /([0-9]{4})([0-9]{2})/
    return onlyNum.replace(RegDateFmt, DataFormat)
  }

  if (
    onlyNum.length === 7 &&
    value.length === 8 &&
    textDate.length === 7 &&
    textDate.substring(textDate.length - 1) !== formatSeparator
  ) {
    DataFormat = `$1${formatSeparator}$2${formatSeparator}`
    RegDateFmt = /([0-9]{4})([0-9]{2})/
    return onlyNum.replace(RegDateFmt, DataFormat)
  }

  if (onlyNum.length > 8 || value.length > 10) return textDate

  if (
    value.substring(value.length - 1) === formatSeparator &&
    textDate.substring(textDate.length - 1) !== formatSeparator
  )
    return value.slice(0, value.length - 1)

  return value
}

export const floorToTens = (year: number): number => Math.floor(year / 10) * 10
export const floorToHundredths = (year: number): number => Math.floor(year / 10) * 10

export const checkFirstDateInDecade = (date: string): boolean => {
  return findYearInStr(date) % 10 === 0 && checkFirstDayInYear(date)
}

export const checkLastDateInDecade = (date: string): boolean => {
  return findYearInStr(date) % 10 === 9 && checkLastDayInYear(date)
}

export const checkFirstDayInYear = (date: string): boolean => {
  return findMonthInStr(date) === 1 && findDayInStr(date) === 1
}

export const checkLastDayInYear = (date: string): boolean => {
  return findMonthInStr(date) === 12 && findDayInStr(date) === 31
}

export const checkSetFormatRegExr = (format: string, str: string): boolean => {
  if (!str) return true

  let numLength = checkYYYYMMDD(format) ? 4 : 2
  const regExp = new RegExp(
    `([0-9a-zA-z]{${numLength}})*${findSpecialCharacterStr(
      format,
    )}([0-9a-zA-z]{2})*${findSpecialCharacterStr(format)}([0-9a-zA-z]+)`,
  )

  return regExp.test(str)
}
