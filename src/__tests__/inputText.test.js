import "@testing-library/jest-dom";
import React from "react";
import { act, fireEvent, render, renderHook, screen } from "@testing-library/react";
import { useDateContext } from "../hooks/useDateContext";

import DateInput from "../components/DateInput";
import DateProvider from "../context/DateProvider";
import { formattingNumToDate } from "../utils/dateFormat";

import { EStandard, EType } from "../@types/date";

describe("DateInput input value test", () => {
  it("has a input box", () => {
    const { getByRole } = render(<DateInput />);
    getByRole("input");
  });

  it("matches snapshot", () => {
    const { container } = render(<DateInput />);
    expect(container).toMatchSnapshot();
  });

  it("if custom value set input value and dateContext value", () => {
    const customValue = "2022-01-05";

    const { getByRole } = render(<DateInput value={customValue} />);
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    });

    act(() => {
      result.current.action.changeHighlightDate(
        EStandard.STARTDATE,
        customValue,
        "YYYY-MM-DD",
        EType.INPUT
      );
    });

    expect(getByRole("input")).toHaveAttribute("value", customValue);
    expect(result.current.value.startDate.selectedDate).toBe(customValue);
  });

  it("should change a value when write in input box", () => {
    const { getByRole } = render(<DateInput />);
    const input = getByRole("input");

    fireEvent.change(input, { target: { value: "20220101" } });

    expect(formattingNumToDate("20220101", "YYYY-MM-DD")).not.toBe("20220101");
    expect(formattingNumToDate("20220101", "YYYY-MM-DD")).toBe("2022-01-01");
    expect(input).toHaveAttribute("value", "2022-01-01");
  });
});
