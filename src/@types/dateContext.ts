import { IDate } from './date'

export interface IDateContextValues {
  startDate: IDate
  endDate: IDate
  single: IDate
  [key: string]: IDate
}

export interface IDateContextActions {
  changeBiggerUnit: (_standard: string) => void
  changeTitle: (_standard: string, _arrow: string) => void
  changeHighlightDate: (_standard: string, _dateStr: string, _format: string, _type: string) => void
  changeMonth: (_standard: string, _index: number) => void
  changeYear: (_standard: string, _year: number) => void
  changeDecade: (_standard: string, _decade: number) => void
  setSelectedDate: (_double: boolean, _value: string[], _format: string) => void
  setToDisabledEndDate: (_double: boolean, _disabledEndDate: string) => void
}

export interface IDateContext {
  value: IDateContextValues
  action: IDateContextActions
}

export interface IDatePickerContextValues {
  width: string
  height: string
  double: boolean
  startDayOfWeek: string
  disabledDates: string[] | null
  mode: string
  placement: string
  format: string
  locale?: string
  placeholder: string
  readOnly?: boolean
  value: string[]
  formatSeparator: () => string
  onChange: (_value: string[]) => void
  onError: (_error: any, _value: any) => void
}

export interface IDatePickerContextActions {
  setInitOption: (_option: IDatePickerContextValues) => void
}

export interface IDatePickerContext {
  value: IDatePickerContextValues
  action: IDatePickerContextActions
}
