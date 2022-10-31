import { IDate, IDay } from "./date";

export interface IDateContextValues {
  startDate: IDate;
  endDate: IDate;
  single: IDate;
  [key: string]: any;
}

export interface IDateContextActions {
  changeBiggerUnit: (standard: string) => void;
  changeTitle: (standard: string, arrow: string) => void;
  changeHighlightDateByCalendar: (standard: string, seletedDay: IDay) => void;
  changeHighlightDateByInput: (standard: string, dateStr: string) => void;
  changeMonth: (standard: string, index: number) => void;
  changeYear: (standard: string, year: number) => void;
  changeDecade: (standard: string, decade: number) => void;
}

export interface IDatePickerContextValues {
  width?: string;
  height?: string;
  double?: boolean;
  locale?: string;
  startDayOfWeek?: string;
  disabledDates?: string[] | null;
  mode?: string;
  placement?: string;
  placeholder?: string;
  readOnly?: boolean;
  format?: string;
}

export interface IDatePickerContextActions {
  setInitOption: (option: IDatePickerContextValues) => void;
}
