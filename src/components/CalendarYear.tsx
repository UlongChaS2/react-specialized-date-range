import * as React from "react";
import useYear from "../hooks/useYear";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";

import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import { ICalendarProps } from "../@types/date";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

export default function CalendarYear({ standard }: ICalendarProps) {
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates } = option;

  const { year, selectedDate } = date[standard];
  const { years } = useYear({ year });
  const selectedYear = selectedDate.split("-")[0];
  const disabledYear = disabledDates?.map((item) => Number(item.slice(0, 4)));

  const handleClickYear = (year: number) => {
    disabledYear &&
      year >= disabledYear[0] &&
      year <= disabledYear[1] &&
      actions.changeYear(standard, year);
  };

  return (
    <div className='calendarDateLargeUnitWrapper'>
      {years &&
        years.map((year, index) => (
          <div
            key={year}
            className={`calendarDateLargeUnitContent ${
              selectedDate && selectedYear === String(year) && "highlight"
            } ${
              (index === 0 ||
                index === 11 ||
                (disabledYear && (year < disabledYear[0] || year > disabledYear[1]))) &&
              "disabled"
            }`}
            onClick={() => handleClickYear(year)}
          >
            {year}
          </div>
        ))}
    </div>
  );
}