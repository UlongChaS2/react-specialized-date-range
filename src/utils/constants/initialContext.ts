import { IDate, IDay } from "../../@types/date";
import { IDatePickerContextValues } from "../../@types/dateContext";
import { convertTitleToUnit, todayDashFormat } from "../dateFormat";

const defaultDateOption: IDate = {
  unit: "day",
  title: function () {
    return convertTitleToUnit(this.unit, this.year, this.month);
  },
  year: new Date().getFullYear(),
  month: new Date().getMonth() + 1,
  day: new Date().getDate(),
  today: todayDashFormat(),
  selectedDate: "",
};

export const initialDateState = {
  startDate: defaultDateOption,
  endDate: defaultDateOption,
  single: defaultDateOption,
};

export const initialDateAction = {
  changeBiggerUnit(standard: string) {},
  changeTitle(standard: string, arrow: string) {},
  changeHighlightDateByCalendar(standard: string, seletedDay: IDay) {},
  changeHighlightDateByInput(standard: string, dateStr: string) {},
  changeMonth(standard: string, index: number) {},
  changeYear(standard: string, year: number) {},
  changeDecade(standard: string, decade: number) {},
};

export const initialDateOptionState = {
  width: "100%",
  height: "100%",
  double: true,
  disabledDates: null,
  placeholder: "YYYY-MM-DD",
  mode: "basic",
  placement: "bottom",
  format: "YYYY-MM-DD",
  value: ["", ""],
  onChange: () => {},
};

export const initialDateOptionAction = {
  setInitOption(option: IDatePickerContextValues) {},
};
