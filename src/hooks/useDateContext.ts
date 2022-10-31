import * as React from "react";
import { DateActionsContext, DateValuesContext } from "../context/DateProvider";

function useDateValuesContext() {
  const context = React.useContext(DateValuesContext);
  if (context === undefined)
    throw new Error("useDateValuesContext should be used within DateContext.Provider");

  return context;
}

function useDateActionsContext() {
  const context = React.useContext(DateActionsContext);
  if (context === undefined)
    throw new Error("useDateActionsContext should be used within DateContext.Provider");

  return context;
}

export { useDateValuesContext, useDateActionsContext };
