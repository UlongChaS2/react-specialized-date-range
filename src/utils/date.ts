import { EStandard, EUnit, IDate } from "../@types/date";
import { IDateContextValues } from "../@types/dateContext";
import { translateOneToTenFormat } from "./dateFormat";
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
  clickedDate: any
) => {
  const { selectedDate } = prevDate[refer(standard)];

  const clickedDateArr = clickedDate.date.split("-");
  let selectedYear = Number(clickedDateArr[0]);
  let selectedMonth = Number(clickedDateArr[1]);
  const selectedDay = clickedDateArr[2];

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
    selectedDate: `${selectedYear}-${translateOneToTenFormat(selectedMonth)}-${selectedDay}`,
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
  str: string
) => {
  const { selectedDate } = prevDate[refer(standard)];
  const selectedYear = str.split("-")[0];
  const selectedMonth = str.split("-")[1];

  let newSelectedDate = {
    year: Number(selectedYear),
    month: Number(selectedMonth),
    selectedDate: str,
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
  if (!value) return prev.year;
  return Number(value.split("-")[1]);
};
