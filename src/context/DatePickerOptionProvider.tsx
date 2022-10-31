import * as React from "react";
import { IDatePickerContextActions, IDatePickerContextValues } from "../@types/dateContext";
import { initialDateOptionAction, initialDateOptionState } from "../utils/constants/initialContext";

export const DatePickerOptionValueContext =
  React.createContext<IDatePickerContextValues>(initialDateOptionState);

export const DatePickerOptionActionsContext =
  React.createContext<IDatePickerContextActions>(initialDateOptionAction);

const DatePickerOptionProvider = ({ children }: { children: React.ReactNode }) => {
  const [option, setOption] = React.useState<IDatePickerContextValues>(initialDateOptionState);

  const actions = React.useMemo(
    () => ({
      setInitOption(option: IDatePickerContextValues) {
        setOption((prev) => ({ ...prev, ...option }));
      },
    }),
    []
  );

  return (
    <DatePickerOptionActionsContext.Provider value={actions}>
      <DatePickerOptionValueContext.Provider value={option}>
        {children}
      </DatePickerOptionValueContext.Provider>
    </DatePickerOptionActionsContext.Provider>
  );
};

export default DatePickerOptionProvider;
