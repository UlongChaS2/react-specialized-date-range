import * as React from "react";
import useDay from "../hooks/useDay";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";
import { useTranslation } from "react-i18next";

import i18n from "../lang/i18n";

import { weekDays } from "../utils/constants/date";
import { refer } from "../utils/dateOption";
import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import { ICalendarDayProps, IDay } from "../@types/date";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";
import { dateFormatYYYYMMDD, onlyNum, transformDDMMYYYYtoMMDDYYYY } from "../utils/dateFormat";

export default function CalendarDay({ standard, year, month, selectedDate }: ICalendarDayProps) {
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, locale = i18n.language, startDayOfWeek, format } = option;

  const { t } = useTranslation();

  const reorderWeekDays =
    startDayOfWeek && startDayOfWeek !== "Sunday"
      ? weekDays
          .slice(weekDays.indexOf(startDayOfWeek), weekDays.length)
          .concat(weekDays.slice(0, weekDays.indexOf(startDayOfWeek)))
      : weekDays;

  const { days } = useDay({ year, month, locale, reorderWeekDays, format });

  const handleClickDay = (day: IDay) => {
    if (!disabledDates) return actions.changeHighlightDateByCalendar(standard, day, format);

    let startDisabledDate = disabledDates[0];
    let endDisabledDate = disabledDates[1];
    let selecteDay = day.date;

    if (format.startsWith("D") || format.startsWith("d")) {
      startDisabledDate = transformDDMMYYYYtoMMDDYYYY(startDisabledDate);
      endDisabledDate = transformDDMMYYYYtoMMDDYYYY(endDisabledDate);
      selecteDay = transformDDMMYYYYtoMMDDYYYY(selecteDay);
    }

    (!disabledDates[0] || startDisabledDate < selecteDay) &&
      (!disabledDates[1] || selecteDay < endDisabledDate) &&
      actions.changeHighlightDateByCalendar(standard, day, format);
  };

  const rangeStyle = (day: string) => {
    let startSelected = date.startDate.selectedDate;
    let endSelected = date.endDate.selectedDate;
    let dayEl = day;

    if (format.startsWith("D") || format.startsWith("d")) {
      startSelected = transformDDMMYYYYtoMMDDYYYY(startSelected);
      endSelected = transformDDMMYYYYtoMMDDYYYY(endSelected);
      dayEl = transformDDMMYYYYtoMMDDYYYY(dayEl);
    }

    return date.startDate.selectedDate && startSelected < dayEl && dayEl < endSelected;
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
                (selectedDate === day.date || date[refer(standard)].selectedDate === day.date) &&
                "highlight"
              } ${rangeStyle(day.date) && "range"} ${
                day.weekday === t("weekDays.Saturday") && "saturday"
              } ${day.weekday === t("weekDays.Sunday") && "sunday"} ${
                (day.isCurrentDay !== "thisMonth" ||
                  (disabledDates && disabledDates[0] >= day.date) ||
                  (disabledDates && day.date >= disabledDates[1] && disabledDates[1])) &&
                "disabled"
              }`}
              key={index}
              onClick={() => handleClickDay(day)}
            >
              {day.value}
            </div>
          ))}
      </div>
    </div>
  );
}
