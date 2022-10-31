import * as React from "react";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";

import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import { translateOneToTenFormat } from "../utils/dateFormat";
import { useTranslation } from "react-i18next";
import { months } from "../utils/constants/date";
import { ICalendarProps } from "../@types/date";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

export default function CalendarMonth({ standard }: ICalendarProps) {
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const { t } = useTranslation();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates } = option;

  const { selectedDate, year } = date[standard];
  const selectedYear = selectedDate.split("-")[0];
  const selectedMonth = selectedDate.split("-")[1];
  const disabledMonth = disabledDates?.map((item) => item.slice(0, -3));

  const handleClickMonth = (index: number) => {
    disabledMonth &&
      `${date[standard].year}-${translateOneToTenFormat(index + 1)}` >= disabledMonth[0] &&
      `${date[standard].year}-${translateOneToTenFormat(index + 1)}` <= disabledMonth[1] &&
      actions.changeMonth(standard, index);
  };

  return (
    <div className='calendarDateLargeUnitWrapper'>
      {[...Array(12)].map((x, index) => (
        <div
          key={index}
          className={`calendarDateLargeUnitContent ${
            selectedMonth === translateOneToTenFormat(index + 1) &&
            selectedYear === String(year) &&
            "highlight "
          } ${
            disabledDates &&
            disabledMonth &&
            (`${date[standard].year}-${translateOneToTenFormat(index + 1)}` < disabledMonth[0] ||
              `${date[standard].year}-${translateOneToTenFormat(index + 1)}` > disabledMonth[1]) &&
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
