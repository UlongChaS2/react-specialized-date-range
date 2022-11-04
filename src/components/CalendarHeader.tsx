import * as React from "react";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

import i18n from "../lang/i18n";
import { convertToDeafultFormat, convertDateFormat } from "../utils/dateFormat";
import { EDirection, ELanguage, EUnit, ICalendarProps } from "../@types/date";
import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";

export default function CalendarHeader({ standard }: ICalendarProps) {
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, format } = option;

  const arrowCondition = (disabledDates: string, direction: string) => {
    if (!disabledDates) return false;

    const { year, month, unit } = date[standard];

    const disabledDate = convertToDeafultFormat(disabledDates, format);
    const calendarDate = convertDateFormat(year, month);

    if (direction === EDirection.LEFT) {
      return (unit === EUnit.MONTH && i18n.language !== ELanguage.EN) || unit === EUnit.DAY
        ? disabledDate.slice(0, -3) >= calendarDate.slice(0, -3)
        : disabledDate.slice(0, 4) >= date[standard].title().slice(0, 4);
    } else {
      return (unit === EUnit.MONTH && i18n.language !== ELanguage.EN) || unit === EUnit.DAY
        ? disabledDate.slice(0, -3) <= calendarDate.slice(0, -3)
        : disabledDate.slice(0, 4) >= date[standard].title().slice(0, 4);
    }
  };

  return (
    <div className='calendarHeaderWrapper'>
      {disabledDates && arrowCondition(disabledDates[0], EDirection.LEFT) ? (
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

      {disabledDates && arrowCondition(disabledDates[1], EDirection.RIGHT) ? (
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
