import * as React from "react";
import { useDateContext } from "../hooks/useDateContext";
import useDecade from "../hooks/useDecade";

import { IDatePickerContextValues } from "../types/dateContext";
import { ICalendarProps } from "../types/date";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";
import {
  checkFirstDateInDecade,
  checkLastDateInDecade,
  convertToDeafultFormat,
  findDecadeInYear,
  findYearInStr,
  floorToTens,
} from "../utils/dateFormat";

export default function CalendarDecade({ standard }: ICalendarProps) {
  const { value: date, action } = useDateContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, format } = option;

  const { year, selectedDate } = date[standard];
  const { decades } = useDecade({ year });
  const selectedYear = findYearInStr(selectedDate, format);
  const disabledYear = disabledDates?.map((item) =>
    findYearInStr(convertToDeafultFormat(item, format))
  );

  const handleClickDecade = (decade: number) => {
    if (!disabledYear || !disabledDates)
      return action.changeDecade(standard, decade);

    if (
      floorToTens(disabledYear[0]) < decade &&
      floorToTens(disabledYear[1]) >= decade &&
      !(
        floorToTens(disabledYear[0]) === decade &&
        checkLastDateInDecade(disabledDates[0])
      ) &&
      !(
        floorToTens(disabledYear[1]) === decade &&
        checkFirstDateInDecade(disabledDates[1])
      )
    )
      return action.changeDecade(standard, decade);
  };

  const disabledCondition = (decade: number): boolean => {
    if (disabledDates && disabledYear) {
      if (
        floorToTens(disabledYear[0]) > decade ||
        (floorToTens(disabledYear[0]) === decade &&
          checkLastDateInDecade(disabledDates[0]))
      )
        return true;

      if (
        floorToTens(disabledYear[1]) < decade ||
        (floorToTens(disabledYear[1]) === decade &&
          checkFirstDateInDecade(disabledDates[1]))
      )
        return true;
    }

    return false;
  };

  return (
    <div className="calendarDateLargeUnitWrapper">
      {decades &&
        decades.map((decade, index) => (
          <div
            key={decade}
            className={`calendarDateLargeUnitContent ${
              findDecadeInYear(selectedYear) === findDecadeInYear(decade) &&
              "highlight"
            } ${
              (index === 0 || index === 11 || disabledCondition(decade)) &&
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
