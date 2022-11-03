import { EStandard, EUnit, IDate } from "../@types/date";
import { IDateContextValues } from "../@types/dateContext";
import { dateFormat, findSpecialCharacterStr, translateOneToTenFormat } from "./dateFormat";
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

export const onChangeDateByCalendar = (
  prevDate: IDateContextValues,
  standard: string,
  clickedDate: any,
  format: string
) => {
  const { selectedDate } = prevDate[refer(standard)];

  const clickedDateArr = clickedDate.date.split(findSpecialCharacterStr(format));
  let selectedYear =
    format.startsWith("Y") || format.startsWith("y") ? +clickedDateArr[0] : +clickedDateArr[2];

  let selectedMonth =
    format.startsWith("M") || format.startsWith("m") ? +clickedDateArr[0] : +clickedDateArr[1];

  const selectedDay =
    format.startsWith("Y") || format.startsWith("y")
      ? +clickedDateArr[2]
      : format.startsWith("M") || format.startsWith("m")
      ? +clickedDateArr[1]
      : +clickedDateArr[0];

  if (selectedMonth) {
    if (selectedMonth === 13) {
      selectedYear++;
      selectedMonth = 1;
    }
  } else {
    selectedYear--;
    selectedMonth = 12;
  }

  let newSelectedDate = {
    year: selectedYear,
    month: selectedMonth,
    selectedDate: dateFormat(format, selectedYear, selectedMonth, selectedDay),
  };

  if (
    standard !== EStandard.SINGLE &&
    ((refer(standard) === EStandard.ENDDATE && clickedDate.date > selectedDate) ||
      (refer(standard) === EStandard.STARTDATE && clickedDate.date < selectedDate))
  ) {
    return {
      ...prevDate,
      [standard]: { ...prevDate[standard], ...newSelectedDate },
      [refer(standard)]: { ...prevDate[refer(standard)], selectedDate: "" },
    };
  }

  return { ...prevDate, [standard]: { ...prevDate[standard], ...newSelectedDate } };
};

export const onChangeDateByInput = (
  prevDate: IDateContextValues,
  standard: string,
  str: string,
  format: string
) => {
  const { selectedDate } = prevDate[refer(standard)];

  const selectedDateArr = str.split(findSpecialCharacterStr(format));
  const selectedYear =
    format.startsWith("Y") || format.startsWith("y") ? selectedDateArr[0] : selectedDateArr[2];

  const selectedMonth =
    format.startsWith("M") || format.startsWith("m") ? selectedDateArr[0] : selectedDateArr[1];

  const selectedDay =
    format.startsWith("Y") || format.startsWith("y")
      ? selectedDateArr[2]
      : format.startsWith("M") || format.startsWith("m")
      ? selectedDateArr[1]
      : selectedDateArr[0];

  let newSelectedDate = {
    year: Number(selectedYear),
    month: Number(selectedMonth) < 13 ? Number(selectedMonth) : 12,
    selectedDate:
      Number(selectedMonth) < 13 ? str : dateFormat(format, +selectedYear, 12, +selectedDay),
  };

  if (!str) {
    return {
      ...prevDate,
      [standard]: { ...prevDate[standard], selectedDate: "" },
    };
  }

  if (
    standard !== EStandard.SINGLE &&
    ((refer(standard) === EStandard.ENDDATE && str > selectedDate) ||
      (refer(standard) === EStandard.STARTDATE && str < selectedDate))
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
