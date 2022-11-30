/* eslint-disable no-unused-vars */
import { IDate } from '../../types/date'
import { IDatePickerContextValues } from '../../types/dateContext'
import { convertTitleToUnit, convertDateFormat, findSpecialCharacterStr } from '../dateFormat'
import { thisDay, thisMonth, thisYear } from './date'

const defaultDateOption: IDate = {
  unit: 'day',
  title: function () {
    return convertTitleToUnit(this.unit, this.year, this.month)
  },
  year: thisYear,
  month: thisDay === 1 ? thisMonth - 1 : thisMonth,
  today: convertDateFormat(),
  selectedDate: '',
}

export const initialDateState = {
  startDate: defaultDateOption,
  endDate: defaultDateOption,
  single: defaultDateOption,
}

export const initialDateAction = {
  changeBiggerUnit(standard: string) {},
  changeTitle(standard: string, arrow: string) {},
  changeHighlightDate(standard: string, dateStr: string, format: string, type: string) {},
  changeMonth(standard: string, index: number) {},
  changeYear(standard: string, year: number) {},
  changeDecade(standard: string, decade: number) {},
  setSelectedDate(double: boolean, value: string[], format: string) {},
  setToDisabledEndDate(double: boolean, disabledEndDate: string) {},
}

export const initialDate = {
  value: initialDateState,
  action: initialDateAction,
}

export const initialDateOptionState = {
  width: '100%',
  height: '100%',
  double: true,
  disabledDates: null,
  placeholder: '',
  mode: 'basic',
  placement: 'bottom',
  format: 'YYYY-MM-DD',
  value: ['', ''],
  locale: 'ko',
  formatSeparator: function () {
    return findSpecialCharacterStr(this.format)
  },
  startDayOfWeek: 'Sunday',
  onChange: () => {},
  onError: () => {},
}

export const initialDateOptionAction = {
  setInitOption(option: IDatePickerContextValues) {},
}

export const initialDatePicker = {
  value: initialDateOptionState,
  action: initialDateOptionAction,
}
