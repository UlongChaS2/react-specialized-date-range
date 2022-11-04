import * as React from "react";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";
import { useTranslation } from "react-i18next";

import {
  converToProperDeafultFormat,
  findMonthInStr,
  findYearInStr,
  convertToDoubleDigits,
} from "../utils/dateFormat";
import { months } from "../utils/constants/date";

import { ICalendarProps } from "../@types/date";
import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

export default function CalendarMonth({ standard }: ICalendarProps) {
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const { t } = useTranslation();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, format } = option;

  const { selectedDate, year } = date[standard];
  const selectedYear = findYearInStr(selectedDate, format);
  const selectedMonth = findMonthInStr(selectedDate, format);
  const disabledMonth = disabledDates?.map((item) =>
    converToProperDeafultFormat(item, format).slice(0, -3)
  );

  const handleClickMonth = (index: number) => {
    disabledMonth &&
      `${date[standard].year}-${convertToDoubleDigits(index + 1)}` >= disabledMonth[0] &&
      (`${date[standard].year}-${convertToDoubleDigits(index + 1)}` <= disabledMonth[1] ||
        !disabledMonth[1]) &&
      actions.changeMonth(standard, index);
  };

  return (
    <div className='calendarDateLargeUnitWrapper'>
      {[...Array(12)].map((x, index) => (
        <div
          key={index}
          className={`calendarDateLargeUnitContent ${
            selectedMonth === index + 1 && selectedYear === year && "highlight "
          } ${
            disabledDates &&
            disabledMonth &&
            (`${date[standard].year}-${convertToDoubleDigits(index + 1)}` < disabledMonth[0] ||
              (`${date[standard].year}-${convertToDoubleDigits(index + 1)}` > disabledMonth[1] &&
                disabledMonth[1])) &&
            "disabled"
          }`}
          onClick={() => handleClickMonth(index)}
        >
          {t(`month.${months[index]}`)}
        </div>
      ))}
    </div>
  );
}
