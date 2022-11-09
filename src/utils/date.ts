import { EStandard, EType, EUnit, IDate } from "../@types/date";
import { IDateContextValues } from "../@types/dateContext";
import {
  convertToDeafultFormat,
  convertDateFormat,
  findDayInStr,
  findMonthInStr,
  findYearInStr,
} from "./dateFormat";
import { refer } from "./dateOption";
import { changeCentury, changeDecade, changeMonth, changeYear } from "./dateTitle";

export const onChangeTitle = (prevDate: IDate, arrow: string): IDate => {
  if (prevDate.unit === EUnit.DAY) return changeMonth(prevDate, arrow);
  if (prevDate.unit === EUnit.MONTH) return changeYear(prevDate, arrow);
  if (prevDate.unit === EUnit.YEAR) return changeDecade(prevDate, arrow);
  if (prevDate.unit === EUnit.DECADE) return changeCentury(prevDate, arrow);

  return prevDate;
};

export const onChangeBiggerUnit = (prevDate: IDate): IDate => {
  if (prevDate.unit === EUnit.DECADE) return prevDate;

  let unit = prevDate.unit;

  if (prevDate.unit === EUnit.DAY) unit = EUnit.MONTH;
  if (prevDate.unit === EUnit.MONTH) unit = EUnit.YEAR;
  if (prevDate.unit === EUnit.YEAR) unit = EUnit.DECADE;

  return { ...prevDate, unit };
};

export const onChangeDate = (
  prevDate: IDateContextValues,
  standard: string,
  str: string,
  format: string,
  type: string
): IDateContextValues => {
  if (!str) return { ...prevDate, [standard]: { ...prevDate[standard], selectedDate: "" } };

  const { selectedDate } = prevDate[refer(standard)];
  let selectedYear = findYearInStr(str, format);
  let selectedMonth = findMonthInStr(str, format);
  const selectedDay = findDayInStr(str, format);

  if (type === EType.CALENDAR) {
    if (selectedMonth === 13) {
      selectedYear++;
      selectedMonth = 1;
    } else if (!selectedMonth) {
      selectedYear--;
      selectedMonth = 12;
    }
  } else {
    selectedMonth >= 13 && (selectedMonth = 12);
  }

  let newSelectedDate = {
    year: selectedYear,
    month: selectedMonth < 13 ? selectedMonth : 12,
    selectedDate: convertDateFormat(selectedYear, selectedMonth, selectedDay, format),
  };

  const referSelcetedDate = convertToDeafultFormat(selectedDate, format);
  const writenDate = convertToDeafultFormat(str, format);
  if (
    standard !== EStandard.SINGLE &&
    ((refer(standard) === EStandard.ENDDATE && writenDate > referSelcetedDate) ||
      (refer(standard) === EStandard.STARTDATE && writenDate < referSelcetedDate))
  ) {
    return {
      ...prevDate,
      [standard]: { ...prevDate[standard], ...newSelectedDate },
      [refer(standard)]: { ...prevDate[refer(standard)], selectedDate: "" },
    };
  }

  return { ...prevDate, [standard]: { ...prevDate[standard], ...newSelectedDate } };
};

export const onChangeMonth = (prevDate: IDate, index: number): IDate => {
  return { ...prevDate, unit: EUnit.DAY, month: index + 1 };
};

export const onChangeYearOrDecade = (prevDate: IDate, year: number): IDate => {
  return { ...prevDate, unit: prevDate.unit === EUnit.DECADE ? EUnit.YEAR : EUnit.MONTH, year };
};

export const onSetSelectDate = (
  prevDate: IDateContextValues,
  double: boolean,
  value: string[],
  format: string
): IDateContextValues => {
  if (double) {
    return {
      ...prevDate,
      startDate: getDate(prevDate.startDate, value[0], format),
      endDate: getDate(prevDate.endDate, value[1], format),
    };
  } else {
    return {
      ...prevDate,
      single: getDate(prevDate.single, value[0], format),
    };
  }
};

export const onSetToDisabledEndDate = (
  prev: IDateContextValues,
  double: boolean,
  disabledEndDate: string
): IDateContextValues => {
  const year = +disabledEndDate.slice(0, 4);
  const month = +disabledEndDate.slice(-2);

  if (double) {
    return {
      ...prev,
      startDate: { ...prev.startDate, year, month },
      endDate: { ...prev.endDate, year, month },
    };
  } else {
    return {
      ...prev,
      single: { ...prev.single, year, month },
    };
  }
};

const getDate = (prev: IDate, value: string, format: string) => {
  return {
    ...prev,
    selectedDate: value,
    year: findYearInStr(value, format) ? findYearInStr(value, format) : prev.year,
    month: findMonthInStr(value, format) ? findMonthInStr(value, format) : prev.month,
  };
};
