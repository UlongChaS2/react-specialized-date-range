import * as React from "react";
import {
  DatePickerOptionActionsContext,
  DatePickerOptionValueContext,
} from "../context/DatePickerOptionProvider";

function useDatePickerOptionValuesContext() {
  const context = React.useContext(DatePickerOptionValueContext);
  if (context === undefined)
    throw new Error("useDatePickerOptionValuesContext should be used within DateContext.Provider");

  return context;
}

function useDatePickerOptionActionsContext() {
  const context = React.useContext(DatePickerOptionActionsContext);
  if (context === undefined)
    throw new Error("useDatePickerOptionActionsContext should be used within DateContext.Provider");

  return context;
}

export { useDatePickerOptionValuesContext, useDatePickerOptionActionsContext };
