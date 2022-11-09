import "@testing-library/jest-dom";
import React from "react";
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { useDateContext } from "../hooks/useDateContext";

import CalendarHeader from "../components/CalendarHeader";
import DateProvider from "../context/DateProvider";

import { EStandard, EUnit } from "../@types/date";
import { convertTitleToUnit } from "../utils/dateFormat";
import { months, thisDay, thisMonth, thisYear } from "../utils/constants/date";

describe("CalendarHeader test", () => {
  it("What to display for the title when you click title and ", () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />);
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    });
    const { action } = result.current;

    fireEvent.click(getByRole("title"));
    act(() => {
      action.changeBiggerUnit(EStandard.STARTDATE);
      action.changeTitle(EStandard.STARTDATE, EDirection.LEFT);
    });
  });
});
