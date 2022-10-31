import * as React from "react";
import { ICalendarProps } from "../@types/date";
import CalendarDate from "./CalendarDate";
import CalendarHeader from "./CalendarHeader";

export default function Calendar({ standard }: ICalendarProps) {
  return (
    <div className='calendarWrapper'>
      <CalendarHeader standard={standard} />
      <CalendarDate standard={standard} />
    </div>
  );
}
