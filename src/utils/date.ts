import { EStandard, EUnit, IDate } from "../@types/date";
import { IDateContextValues } from "../@types/dateContext";
import {
  converToProperDeafultFormat,
  convertDateFormat,
  findDayInStr,
  findMonthInStr,
  findYearInStr,
} from "./dateFormat";
import { refer } from "./dateOption";
import { changeCentury, changeDecade, changeMonth, changeYear } from "./dateTitle";

export const onChangeTitle = (prevDate: IDate, arrow: string) => {
  if (prevDate.unit === EUnit.DAY) return changeMonth(prevDate, arrow);
  if (prevDate.unit === EUnit.MONTH) return changeYear(prevDate, arrow);
  if (prevDate.unit === EUnit.YEAR) return changeDecade(prevDate, arrow);
  if (prevDate.unit === EUnit.DECADE) return changeCentury(prevDate, arrow);
};

export const onChangeBiggerUnit = (prevDate: IDate) => {
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
) => {
  if (!str) return { ...prevDate, [standard]: { ...prevDate[standard], selectedDate: "" } };

  const { selectedDate } = prevDate[refer(standard)];
  let selectedYear = findYearInStr(str, format);
  let selectedMonth = findMonthInStr(str, format);
  const selectedDay = findDayInStr(str, format);

  if (type === "calendar") {
    if (selectedMonth === 13) {
      selectedYear++;
      selectedMonth = 1;
    } else if (!selectedMonth) {
      selectedYear--;
      selectedMonth = 12;
    }
  }

  let newSelectedDate = {
    year: selectedYear,
    month: selectedMonth < 13 ? selectedMonth : 12,
    selectedDate:
      type === "input"
        ? convertDateFormat(selectedYear, 12, selectedDay, format)
        : convertDateFormat(selectedYear, selectedMonth, selectedDay, format),
  };

  const referSelcetedDate = converToProperDeafultFormat(selectedDate, format);
  const writenDate = converToProperDeafultFormat(str, format);

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

export const onChangeMonth = (prevDate: IDate, index: number) => {
  return { ...prevDate, unit: EUnit.DAY, month: index + 1 };
};

export const onChangeYearOrDecade = (prevDate: IDate, year: number) => {
  return { ...prevDate, unit: prevDate.unit === EUnit.DECADE ? EUnit.YEAR : EUnit.MONTH, year };
};

export const setSelectDate = (prevDate: IDateContextValues, double: boolean, value: string[]) => {
  if (double) {
    return {
      ...prevDate,
      startDate: getDate(prevDate.single, value[0]),
      endDate: getDate(prevDate.single, value[1]),
    };
  } else {
    return {
      ...prevDate,
      single: getDate(prevDate.single, value[0]),
    };
  }
};

const getDate = (prev: any, value: string) => {
  return {
    ...prev,
    selectedDate: value,
    year: getYear(prev, value),
    month: getMonth(prev, value),
  };
};

const getYear = (prev: any, value: string) => {
  if (!value) return prev.year;

  return Number(value.split("-")[0]);
};

const getMonth = (prev: any, value: string) => {
  if (!value) return prev.month;
  return Number(value.split("-")[1]);
};
