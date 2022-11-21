import * as React from "react";
import { useDateContext } from "../hooks/useDateContext";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

import {
  convertToDeafultFormat,
  convertDateFormat,
  checkFirstDayInYear,
  checkLastDayInYear,
} from "../utils/dateFormat";
import { getDatesDiff } from "../utils/dateOption";
import { EDirection, EUnit, ICalendarProps } from "../@types/date";
import { IDatePickerContextValues } from "../@types/dateContext";

export default function CalendarHeader({ standard }: ICalendarProps) {
  const { value: date, action } = useDateContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, format } = option;

  const compareWhenUnitIsMonthOrDay = (
    disabledDate: string,
    direction: string
  ) => {
    const { year, month, unit } = date[standard];
    const lastDateOfYear = convertDateFormat(year, 12, 31);
    const firstDateOfYear = convertDateFormat(year, 1, 1);

    const lastDayOfMonth = new Date(year, month, 0).getDate();
    const lastDateOfMonth = convertDateFormat(year, month, lastDayOfMonth);
    const firstDateOfMonth = convertDateFormat(year, month, 1);

    const dateDiffOfYear =
      direction === EDirection.LEFT
        ? getDatesDiff(disabledDate, firstDateOfYear)
        : getDatesDiff(disabledDate, lastDateOfYear);

    const dateDiffOfMonth =
      direction === EDirection.LEFT
        ? getDatesDiff(disabledDate, firstDateOfMonth)
        : getDatesDiff(disabledDate, lastDateOfMonth);

    if (
      (dateDiffOfYear === 1 && unit === EUnit.MONTH) ||
      (dateDiffOfMonth === 1 && unit === EUnit.DAY)
    )
      return false;

    return direction === EDirection.LEFT
      ? unit === EUnit.MONTH
        ? disabledDate < firstDateOfYear
        : disabledDate < firstDateOfMonth
      : unit === EUnit.MONTH
      ? disabledDate > lastDateOfYear
      : disabledDate > lastDateOfMonth;
  };

  const compareWhenUnitIsDecadeOrYear = (
    disabledDate: string,
    direction: string
  ) => {
    const disabledYear = +disabledDate.slice(0, 4);
    const startYear = +(date[standard].title() as string)?.slice(0, 4);
    const endYear = +(date[standard].title() as string)?.slice(-4);

    const firstDateOfDecade = convertDateFormat(startYear, 1, 1);
    const lastDateOfDecade = convertDateFormat(endYear, 12, 31);

    const dateDiffOfDecade =
      direction === EDirection.LEFT
        ? getDatesDiff(disabledDate, firstDateOfDecade)
        : getDatesDiff(disabledDate, lastDateOfDecade);

    const yearDiffOfDecade =
      direction === EDirection.LEFT
        ? Math.abs(disabledYear - +firstDateOfDecade.slice(0, 4))
        : Math.abs(disabledYear - +lastDateOfDecade.slice(0, 4));

    const { unit } = date[standard];

    if (dateDiffOfDecade === 1 && unit === EUnit.YEAR) return false;
    if (yearDiffOfDecade === 10 && unit === EUnit.DECADE) {
      return direction === EDirection.LEFT
        ? !checkLastDayInYear(disabledDate)
        : !checkFirstDayInYear(disabledDate);
    }

    return direction === EDirection.LEFT
      ? disabledYear < startYear
      : disabledYear > endYear;
  };

  const arrowCondition = (disabledDates: string, direction: string) => {
    if (!disabledDates) return false;

    const disabledDate = convertToDeafultFormat(disabledDates, format);

    const { unit } = date[standard];
    return unit === EUnit.MONTH || unit === EUnit.DAY
      ? compareWhenUnitIsMonthOrDay(disabledDate, direction)
      : compareWhenUnitIsDecadeOrYear(disabledDate, direction);
  };

  return (
    <div className="calendarHeaderWrapper">
      {!disabledDates ||
      (disabledDates &&
        (arrowCondition(disabledDates[0], EDirection.LEFT) ||
          !disabledDates[0])) ? (
        <button
          className="calendarHeaderBtn"
          onClick={() => action.changeTitle(standard, EDirection.LEFT)}
        >
          {"«"}
        </button>
      ) : (
        <div className="calendarHeaderBtn disabled" />
      )}

      <div
        role="title"
        onClick={() => action.changeBiggerUnit(standard)}
        className="calendarHeaderTitle"
      >
        {date[standard].title()}
      </div>

      {!disabledDates ||
      (disabledDates &&
        (arrowCondition(disabledDates[1], EDirection.RIGHT) ||
          !disabledDates[1])) ? (
        <button
          className="calendarHeaderBtn"
          onClick={() => action.changeTitle(standard, EDirection.RIGHT)}
        >
          {"»"}
        </button>
      ) : (
        <div className="calendarHeaderBtn disabled" />
      )}
    </div>
  );
}
