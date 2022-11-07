import * as React from "react";
import {
  onChangeTitle,
  onChangeBiggerUnit,
  onChangeMonth,
  onChangeYearOrDecade,
  onChangeDate,
  onSetSelectDate,
  onSetToDisabledEndDate,
} from "../utils/date";
import { IDateContext, IDateContextActions, IDateContextValues } from "../@types/dateContext";
import {
  initialDate,
  initialDateAction,
  initialDateState,
} from "../utils/constants/initialContext";

export const DateValuesContext = React.createContext<IDateContextValues>(initialDateState);
export const DateActionsContext = React.createContext<IDateContextActions>(initialDateAction);

export const DateContext = React.createContext<IDateContext>(initialDate);

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
      changeHighlightDate(standard: string, dateStr: string, format: string, type: string) {
        setDate((prev) => onChangeDate(prev, standard, dateStr, format, type));
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
      setSelectedDate(double: boolean, value: string[], format: string) {
        setDate((prev) => (value ? onSetSelectDate(prev, double, value, format) : prev));
      },
      setToDisabledEndDate(double: boolean, disabledEndDate: string) {
        setDate((prev) => onSetToDisabledEndDate(prev, double, disabledEndDate));
      },
    }),
    []
  );

  // return (
  //   <DateActionsContext.Provider value={actions}>
  //     <DateValuesContext.Provider value={date}>{children}</DateValuesContext.Provider>
  //   </DateActionsContext.Provider>
  // );
  return (
    <DateContext.Provider value={{ value: date, action: actions }}>{children}</DateContext.Provider>
  );
};

export default DateProvider;
