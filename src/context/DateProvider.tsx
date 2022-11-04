import * as React from "react";
import {
  onChangeTitle,
  onChangeBiggerUnit,
  onChangeMonth,
  onChangeYearOrDecade,
  onChangeDate,
  setSelectDate,
} from "../utils/date";
import { IDateContextActions, IDateContextValues } from "../@types/dateContext";
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
