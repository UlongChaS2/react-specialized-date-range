import * as React from "react";
import useYear from "../hooks/useYear";
import { useDateContext } from "../hooks/useDateContext";

import { IDatePickerContextValues } from "../@types/dateContext";
import { ICalendarProps } from "../@types/date";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";
import { convertToDeafultFormat, findYearInStr } from "../utils/dateFormat";

export default function CalendarYear({ standard }: ICalendarProps) {
  const { value: date, action } = useDateContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, format } = option;

  const { year, selectedDate } = date[standard];
  const { years } = useYear({ year });
  const selectedYear = findYearInStr(selectedDate, format);
  const disabledYear = disabledDates?.map(
    (item) => +convertToDeafultFormat(item, format).slice(0, 4)
  );

  const handleClickYear = (year: number) => {
    if (!disabledDates || !disabledYear)
      return action.changeYear(standard, year);

    (disabledYear[0] <= year || !disabledYear[0]) &&
      (year <= disabledYear[1] || !disabledYear[1]) &&
      action.changeYear(standard, year);
  };

  return (
    <div className="calendarDateLargeUnitWrapper">
      {years &&
        years.map((year, index) => (
          <div
            key={year}
            className={`calendarDateLargeUnitContent ${
              selectedDate && selectedYear === year && "highlight"
            } ${
              (index === 0 ||
                index === 11 ||
                (disabledYear &&
                  (year < disabledYear[0] ||
                    (year > disabledYear[1] && disabledYear[1])))) &&
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
