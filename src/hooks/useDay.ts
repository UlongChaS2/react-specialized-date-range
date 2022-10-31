import * as React from "react";

import { weekDays } from "../utils/constants/date";
import { getWeekday, todayDashFormat } from "../utils/dateFormat";
import { IDay } from "../@types/date";

interface IUseDayPrams {
  year: number;
  month: number;
  locale: string;
  reorderWeekDays: string[];
}

export default function useDay({ year, month, locale, reorderWeekDays }: IUseDayPrams) {
  const [days, setDays] = React.useState<Array<IDay>>([]);

  React.useLayoutEffect(() => {
    const firstDayOfMonth = new Date(year, month - 1, 1);
    const lastDayOfMonth = new Date(year, month, 0).getDate();

    const dayShortStr = firstDayOfMonth.toLocaleString("en", {
      weekday: "long",
    });

    const paddingDays = reorderWeekDays.indexOf(dayShortStr);

    const daysArr = [];
    for (let i = 1; i <= 42; i++) {
      if (i > paddingDays && i <= lastDayOfMonth + paddingDays) {
        const dateStr = todayDashFormat(year, month, i - paddingDays);

        daysArr.push({
          value: i - paddingDays,
          isCurrentDay: "thisMonth",
          date: dateStr,
          weekday: getWeekday(year, month - 1, i - paddingDays, locale),
        });
      } else if (i >= lastDayOfMonth) {
        const dateStr = todayDashFormat(year, month + 1, i - (paddingDays + lastDayOfMonth));
        daysArr.push({
          value: i - (paddingDays + lastDayOfMonth),
          isCurrentDay: "nextMonth",
          date: dateStr,
          weekday: getWeekday(year, month, i - (paddingDays + lastDayOfMonth), locale),
        });
      } else {
        const lastDayOfLastMonth = new Date(year, month - 1, 0).getDate();
        const dateStr = todayDashFormat(year, month - 1, lastDayOfLastMonth - paddingDays + i);
        daysArr.push({
          value: lastDayOfLastMonth - paddingDays + i,
          isCurrentDay: "lastMonth",
          date: dateStr,
          weekday: getWeekday(year, month - 2, lastDayOfLastMonth - paddingDays + i, locale),
        });
      }
    }

    setDays(daysArr);
  }, [month]);

  return {
    days,
  };
}