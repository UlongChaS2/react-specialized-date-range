import * as React from "react";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";

import { findSpecialCharacterStr, translateOneToTenFormat } from "../utils/dateFormat";
import { EDirection, ELanguage, EUnit, ICalendarProps } from "../@types/date";
import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import i18n from "../lang/i18n";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

export default function CalendarHeader({ standard }: ICalendarProps) {
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, format } = option;
  const formatSeparator = findSpecialCharacterStr(format);

  const commonArrow = (date: string) => {
    let disabledDate = {
      year: 0,
      month: 0,
    };

    if (format.startsWith("Y") || format.startsWith("y")) {
      disabledDate.year = +date.slice(0, 4);
      disabledDate.month = +date.slice(5, 7);
    } else if (format.startsWith("M") || format.startsWith("m")) {
      disabledDate.year = +date.slice(-4);
      disabledDate.month = +date.slice(0, 2);
    } else {
      disabledDate.year = +date.slice(-4);
      disabledDate.month = +date.slice(3, 5);
    }

    return disabledDate;
  };

  const leftArrow = () => {
    if (disabledDates) {
      if (
        (date[standard].unit === EUnit.MONTH && i18n.language !== ELanguage.EN) ||
        date[standard].unit === EUnit.DAY
      ) {
        if (!disabledDates[0]) return false;

        const { year, month } = commonArrow(disabledDates[0]);
        return new Date(year, month) >= new Date(date[standard].year, date[standard].month);
      } else {
        return format.startsWith("Y") || format.startsWith("y")
          ? +disabledDates[0].slice(0, 4) >= date[standard].title().slice(0, 4)
          : +disabledDates[0].slice(-4) >= date[standard].title().slice(0, 4);
      }
    }
  };

  const rightArrow = () => {
    if (disabledDates) {
      if (
        (date[standard].unit === EUnit.MONTH && i18n.language !== ELanguage.EN) ||
        date[standard].unit === EUnit.DAY
      ) {
        if (!disabledDates[1]) return false;

        const { year, month } = commonArrow(disabledDates[1]);
        return new Date(year, month) <= new Date(date[standard].year, date[standard].month);
      }

      if (format.startsWith("Y") || format.startsWith("y"))
        return +disabledDates[1].slice(0, 4) <= date[standard].title().slice(-4);
      else return +disabledDates[1].slice(-4) <= date[standard].title().slice(0, 4);
    }
  };

  return (
    <div className='calendarHeaderWrapper'>
      {leftArrow() ? (
        <div className='calendarHeaderBtn disabled' />
      ) : (
        <button
          className='calendarHeaderBtn'
          onClick={() => actions.changeTitle(standard, EDirection.LEFT)}
        >
          {"«"}
        </button>
      )}

      <div
        role='title'
        onClick={() => actions.changeBiggerUnit(standard)}
        className='calendarHeaderTitle'
      >
        {date[standard].title()}
      </div>

      {rightArrow() ? (
        <div className='calendarHeaderBtn disabled' />
      ) : (
        <button
          className='calendarHeaderBtn'
          onClick={() => actions.changeTitle(standard, EDirection.RIGHT)}
        >
          {"»"}
        </button>
      )}
    </div>
  );
}
