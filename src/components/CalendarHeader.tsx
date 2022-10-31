import * as React from "react";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";

import { translateOneToTenFormat } from "../utils/dateFormat";
import { EDirection, ELanguage, EUnit, ICalendarProps } from "../@types/date";
import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import i18n from "../lang/i18n";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

export default function CalendarHeader({ standard }: ICalendarProps) {
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates } = option;

  const styleLeftArrow = () => {
    if (disabledDates) {
      if (
        (date[standard].unit === EUnit.MONTH && i18n.language !== ELanguage.EN) ||
        date[standard].unit === EUnit.DAY
      ) {
        return (
          disabledDates[0].slice(0, -3) >=
          `${date[standard].year}-${translateOneToTenFormat(date[standard].month)}`
        );
      }

      return disabledDates[0].slice(0, 4) >= String(date[standard].title()).slice(0, 4);
    }
  };

  const styleRightArrow = () => {
    if (disabledDates) {
      if (
        (date[standard].unit === EUnit.MONTH && i18n.language !== ELanguage.EN) ||
        date[standard].unit === EUnit.DAY
      ) {
        return (
          disabledDates[1].slice(0, -3) <=
          `${date[standard].year}-${translateOneToTenFormat(date[standard].month)}`
        );
      }

      return disabledDates[1].slice(0, 4) <= String(date[standard].title()).slice(-4);
    }
  };

  return (
    <div className='calendarHeaderWrapper'>
      {styleLeftArrow() ? (
        <div className='calendarHeaderBtn disabled' />
      ) : (
        <button
          className='calendarHeaderBtn'
          onClick={() => actions.changeTitle(standard, EDirection.LEFT)}
        >
          {"«"}
        </button>
      )}

      <div onClick={() => actions.changeBiggerUnit(standard)} className='calendarHeaderTitle'>
        {date[standard].title()}
      </div>

      {styleRightArrow() ? (
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
