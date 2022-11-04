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
  changeHighlightDate: (standard: string, dateStr: string, format: string, type: string) => void;
  changeMonth: (standard: string, index: number) => void;
  changeYear: (standard: string, year: number) => void;
  changeDecade: (standard: string, decade: number) => void;
  setSelectedDate: (double: boolean, value?: string[]) => void;
}

export interface IDatePickerContextValues {
  width: string;
  height: string;
  double: boolean;
  startDayOfWeek: string;
  disabledDates: string[] | null;
  mode: string;
  placement: string;
  format: string;
  locale?: string;
  placeholder: string;
  readOnly?: boolean;
  value?: string[];
  formatSeparator: () => string;
  onChange: (e: any) => void;
}

export interface IDatePickerContextActions {
  setInitOption: (option: IDatePickerContextValues) => void;
}
