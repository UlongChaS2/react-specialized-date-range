import * as React from "react";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";

import {
  findSpecialCharacterStr,
  checkYYYYMMDD,
  checkMMDDYYYY,
  converToProperDeafultFormat,
  convertDateFormat,
} from "../utils/dateFormat";
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

    if (checkYYYYMMDD(format)) {
      disabledDate.year = +date.slice(0, 4);
      disabledDate.month = +date.slice(5, 7);
    } else if (checkMMDDYYYY(format)) {
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
      if (!disabledDates[0]) return false;

      const { year, month, unit } = date[standard];

      const disabledDate = converToProperDeafultFormat(disabledDates[0], format);
      const calendarDate = convertDateFormat(year, month);

      return (unit === EUnit.MONTH && i18n.language !== ELanguage.EN) || unit === EUnit.DAY
        ? disabledDate < calendarDate
        : disabledDate.slice(0, 4) >= date[standard].title().slice(0, 4);
    }
  };

  const rightArrow = () => {
    if (disabledDates) {
      if (!disabledDates[1]) return false;

      const { year, month, unit } = date[standard];

      const disabledDate = converToProperDeafultFormat(disabledDates[1], format);
      const calendarDate = convertDateFormat(year, month);

      return (unit === EUnit.MONTH && i18n.language !== ELanguage.EN) || unit === EUnit.DAY
        ? disabledDate > calendarDate
        : disabledDate.slice(0, 4) <= date[standard].title().slice(0, 4);
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
