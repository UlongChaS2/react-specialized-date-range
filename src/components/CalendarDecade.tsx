import * as React from "react";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";
import useDecade from "../hooks/useDecade";

import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import { ICalendarProps } from "../@types/date";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

export default function CalendarDecade({ standard }: ICalendarProps) {
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates } = option;

  const { year, selectedDate } = date[standard];
  const { decades } = useDecade({ year });
  const slelectedYear = selectedDate.split("-")[0];
  const disabledYear = disabledDates?.map((item) => Number(item.slice(0, 4)));

  const handleClickDecade = (decade: number) => {
    disabledYear &&
      decade >= disabledYear[0] &&
      decade <= disabledYear[1] &&
      actions.changeDecade(standard, decade);
  };

  return (
    <div className='calendarDateLargeUnitWrapper'>
      {decades &&
        decades.map((decade, index) => (
          <div
            key={decade}
            className={`calendarDateLargeUnitContent ${
              selectedDate &&
              slelectedYear.slice(0, 3) === String(decade).slice(0, 3) &&
              "highlight"
            } ${
              (index === 0 ||
                index === 11 ||
                (disabledYear && (decade < disabledYear[0] || decade > disabledYear[1]))) &&
              "disabled"
            }`}
            onClick={() => handleClickDecade(decade)}
          >
            {decade}
          </div>
        ))}
    </div>
  );
}
