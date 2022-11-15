import * as React from "react";
import { useDateContext } from "../hooks/useDateContext";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

import i18n from "../lang/i18n";
import { convertToDeafultFormat, convertDateFormat } from "../utils/dateFormat";
import { EDirection, ELanguage, EUnit, ICalendarProps } from "../@types/date";
import { IDatePickerContextValues } from "../@types/dateContext";

export default function CalendarHeader({ standard }: ICalendarProps) {
  const { value: date, action } = useDateContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, format } = option;

  const compareWhenUnitIsDecadeOrYear = (
    disabledDate: string,
    direction: string,
    unit: string
  ): boolean => {
    let year = +disabledDate.slice(0, 4);

    if (direction === EDirection.LEFT) {
      unit === EUnit.DECADE
        ? (year = Math.ceil(year / 100) * 100)
        : (year = Math.ceil(year / 10) * 10);
    } else {
      unit === EUnit.DECADE
        ? (year = Math.floor(year / 100) * 100)
        : (year = Math.floor(year / 10) * 10);
    }

    return direction === EDirection.LEFT
      ? year < +(date[standard].title() as string).slice(0, 4)
      : year > +(date[standard].title() as string).slice(0, 4);
  };

  const compareWhenUnitIsMonthOrDay = (
    disabledDate: any,
    calendarDate: any,
    direction: any,
    unit: any
  ) => {
    console.log(disabledDate.slice(0, -3), calendarDate.slice(0, -3));

    // return disabledDate.slice(0, -3) < calendarDate.slice(0, -3);

    if (unit === EUnit.MONTH) {
      return direction === EDirection.LEFT
        ? disabledDate.slice(0, 4) < calendarDate.slice(0, 4)
        : disabledDate.slice(0, 4) > calendarDate.slice(0, 4);
    } else {
      return true;
    }
  };

  const arrowCondition = (disabledDates: string, direction: string) => {
    if (!disabledDates) return false;

    const { year, month, unit } = date[standard];

    const disabledDate = convertToDeafultFormat(disabledDates, format);
    const calendarDate = convertDateFormat(year, month);

    if (direction === EDirection.LEFT) {
      return unit === EUnit.MONTH || unit === EUnit.DAY
        ? compareWhenUnitIsMonthOrDay(
            disabledDate,
            calendarDate,
            direction,
            unit
          )
        : compareWhenUnitIsDecadeOrYear(disabledDate, direction, unit);
    } else {
      return unit === EUnit.MONTH || unit === EUnit.DAY
        ? disabledDate.slice(0, -3) >= calendarDate.slice(0, -3)
        : compareWhenUnitIsDecadeOrYear(disabledDate, direction, unit);
    }
  };

  return (
    <div className="calendarHeaderWrapper">
      {disabledDates && arrowCondition(disabledDates[0], EDirection.LEFT) ? (
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

      {disabledDates && arrowCondition(disabledDates[1], EDirection.RIGHT) ? (
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
