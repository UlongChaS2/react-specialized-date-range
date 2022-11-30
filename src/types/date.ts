/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

export interface IDate {
  unit: string
  title: () => string | undefined
  today: string | Date
  year: number
  month: number
  selectedDate: string
}

export interface IDay {
  value: number
  isCurrentDay: string
  date: string
  weekday: string
}

export interface ICalendarDayParentProps {
  standard: string
  onError: (error: any, value: any) => void
}
export interface ICalendarProps {
  standard: string
}

export interface IDateInputProps extends ICalendarDayParentProps {
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  value?: string
}

export interface ICalendarDayProps extends ICalendarDayParentProps {
  year: number
  month: number
  selectedDate: string
}

export enum EUnit {
  DAY = 'day',
  MONTH = 'month',
  YEAR = 'year',
  DECADE = 'decade',
}

export enum EStandard {
  SINGLE = 'single',
  STARTDATE = 'startDate',
  ENDDATE = 'endDate',
}

export enum EType {
  CALENDAR = 'calendar',
  INPUT = 'input',
}

export enum ELanguage {
  KO = 'ko',
  EN = 'en',
  JA = 'ja',
}

export enum EDirection {
  LEFT = 'left',
  RIGHT = 'right',
}

export enum EMode {
  STATIC = 'static',
  BASIC = 'basic',
}
