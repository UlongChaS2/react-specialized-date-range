import { today } from '../dateTimeZone'

export const weekDays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
]

export const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

export const thisYear = today.getFullYear()
export const thisMonth = today.getMonth() + 1
export const thisDay = today.getDate()
