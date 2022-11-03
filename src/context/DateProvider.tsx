import * as React from "react";
import {
  onChangeDateByCalendar,
  onChangeTitle,
  onChangeBiggerUnit,
  onChangeMonth,
  onChangeYearOrDecade,
  onChangeDateByInput,
  setSelectDate,
} from "../utils/date";
import { IDateContextActions, IDateContextValues } from "../@types/dateContext";
import { IDay } from "../@types/date";
import { initialDateAction, initialDateState } from "../utils/constants/initialContext";

export const DateValuesContext = React.createContext<IDateContextValues>(initialDateState);
export const DateActionsContext = React.createContext<IDateContextActions>(initialDateAction);

const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [date, setDate] = React.useState<IDateContextValues>(initialDateState);

  const actions = React.useMemo(
    () => ({
      changeBiggerUnit(standard: string) {
        setDate((prev) => ({
          ...prev,
          [standard]: onChangeBiggerUnit(prev[standard]),
        }));
      },
      changeTitle(standard: string, arrow: string) {
        setDate((prev) => ({
          ...prev,
          [standard]: onChangeTitle(prev[standard], arrow),
        }));
      },
      changeHighlightDateByCalendar(standard: string, seletedDay: IDay, format: string) {
        setDate((prev) => onChangeDateByCalendar(prev, standard, seletedDay, format));
      },
      changeHighlightDateByInput(standard: string, dateStr: string, format: string) {
        setDate((prev) => onChangeDateByInput(prev, standard, dateStr, format));
      },
      changeMonth(standard: string, index: number) {
        setDate((prev) => ({
          ...prev,
          [standard]: onChangeMonth(prev[standard], index),
        }));
      },
      changeYear(standard: string, year: number) {
        setDate((prev) => ({
          ...prev,
          [standard]: onChangeYearOrDecade(prev[standard], year),
        }));
      },
      changeDecade(standard: string, decade: number) {
        setDate((prev) => ({
          ...prev,
          [standard]: onChangeYearOrDecade(prev[standard], decade),
        }));
      },
      setSelectedDate(double: boolean, value?: string[]) {
        setDate((prev) => (value ? setSelectDate(prev, double, value) : prev));
      },
    }),
    []
  );

  return (
    <DateActionsContext.Provider value={actions}>
      <DateValuesContext.Provider value={date}>{children}</DateValuesContext.Provider>
    </DateActionsContext.Provider>
  );
};

export default DateProvider;
