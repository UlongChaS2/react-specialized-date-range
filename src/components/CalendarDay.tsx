import * as React from "react";
import useDay from "../hooks/useDay";
import { useDateContext } from "../hooks/useDateContext";
import { useTranslation } from "react-i18next";

import i18n from "../lang/i18n";

import { weekDays } from "../utils/constants/date";
import { IDatePickerContextValues } from "../@types/dateContext";
import { EType, ICalendarDayProps, IDay } from "../@types/date";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";
import { convertToDeafultFormat } from "../utils/dateFormat";

export default function CalendarDay({ standard, year, month }: ICalendarDayProps) {
  const { t } = useTranslation();
  const { value: date, action } = useDateContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, locale = i18n.language, startDayOfWeek, format } = option;
  const formattingDisabledDates = disabledDates?.map((item) =>
    convertToDeafultFormat(item, format)
  );

  const reorderWeekDays =
    startDayOfWeek && startDayOfWeek !== "Sunday"
      ? weekDays
          .slice(weekDays.indexOf(startDayOfWeek), weekDays.length)
          .concat(weekDays.slice(0, weekDays.indexOf(startDayOfWeek)))
      : weekDays;

  const { days } = useDay({ year, month, locale, reorderWeekDays, format });

  const handleClickDay = (day: string) => {
    if (!disabledDates || !formattingDisabledDates)
      return action.changeHighlightDate(standard, day, format, EType.CALENDAR);

    const selecteDay = convertToDeafultFormat(day, format);

    (!disabledDates[0] || formattingDisabledDates[0] < selecteDay) &&
      (!disabledDates[1] || selecteDay < formattingDisabledDates[1]) &&
      action.changeHighlightDate(standard, day, format, EType.CALENDAR);
  };

  const rangeStyle = (day: string) => {
    const startSelected = convertToDeafultFormat(date.startDate.selectedDate, format);
    const endSelected = convertToDeafultFormat(date.endDate.selectedDate, format);
    const dayEl = convertToDeafultFormat(day, format);

    return date.startDate.selectedDate && startSelected < dayEl && dayEl < endSelected;
  };

  const disabledStyle = (day: IDay) => {
    return (
      formattingDisabledDates &&
      (day.isCurrentDay !== "thisMonth" ||
        formattingDisabledDates[0] >= convertToDeafultFormat(day.date, format) ||
        (convertToDeafultFormat(day.date, format) >= formattingDisabledDates[1] &&
          formattingDisabledDates[1]))
    );
  };

  return (
    <div>
      <div className='calendarDateDayUnitWrapper'>
        {reorderWeekDays.map((day, index) => (
          <div className='calendarDateDayUnitHeader' key={index}>
            {t(`weekDays.${day}`)}
          </div>
        ))}
      </div>

      <div className='calendarDateDayUnitContentWrapper'>
        {days &&
          days.map((day, index) => (
            <div
              className={`calendarDateDayUnitContent ${
                (date.startDate.selectedDate === day.date ||
                  date.endDate.selectedDate === day.date) &&
                "highlight"
              } ${rangeStyle(day.date) && "range"} ${
                day.weekday === t("weekDays.Saturday") && "saturday"
              } ${day.weekday === t("weekDays.Sunday") && "sunday"} ${
                disabledStyle(day) && "disabled"
              }`}
              key={index}
              onClick={() => handleClickDay(day.date)}
            >
              {day.value}
            </div>
          ))}
      </div>
    </div>
  );
}
