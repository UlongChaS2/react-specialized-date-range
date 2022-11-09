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

    expect(input).toHaveAttribute("value", "2022-01-01");
    expect(formattingNumToDate("20220101", "YYYY-MM-DD")).not.toBe("20220101");
    expect(formattingNumToDate("20220101", "YYYY-MM-DD")).toBe("2022-01-01");
    expect(formattingNumToDate("20220101", "YYYY-MM-DD")).toMatch(
      /([0-9]{4})*-([0-9]{2})*-([0-9]{2})/
    );
  });

  it("if startDate is greater than endDate, startDate will be an empty str", () => {
    const { getAllByRole } = render(
      <>
        <DateInput standard={EStandard.STARTDATE} value='2022-03-01' />
        <DateInput standard={EStandard.ENDDATE} value='2022-01-01' />
      </>
    );
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    });
    const { action } = result.current;

    const startInput = getAllByRole("input")[0];
    const endInput = getAllByRole("input")[1];

    fireEvent.change(startInput, { target: { value: "20220301" } });
    fireEvent.change(endInput, { target: { value: "20220101" } });
    act(() => {
      action.changeHighlightDate(EStandard.STARTDATE, startInput.value, "YYYY-MM-DD", EType.INPUT);
      action.changeHighlightDate(EStandard.ENDDATE, endInput.value, "YYYY-MM-DD", EType.INPUT);
    });

    // NOTE: 비구조할당을 act전에하면 act 로직에서 바뀐 결과 값이 반영되지 않는다.
    const { startDate, endDate } = result.current.value;
    expect(startDate.selectedDate).toBe("");
    expect(startDate.selectedDate).not.toBe(startInput.value);
    expect(endDate.selectedDate).toBe(endInput.value);
  });

  it("if endDate is smaller than startDate, endDate will be an empty str", () => {
    const { getAllByRole } = render(
      <>
        <DateInput standard={EStandard.STARTDATE} value='2022-03-01' />
        <DateInput standard={EStandard.ENDDATE} value='2022-01-01' />
      </>
    );
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    });
    const { action } = result.current;

    const startInput = getAllByRole("input")[0];
    const endInput = getAllByRole("input")[1];

    fireEvent.change(endInput, { target: { value: "20220101" } });
    fireEvent.change(startInput, { target: { value: "20220301" } });
    act(() => {
      action.changeHighlightDate(EStandard.ENDDATE, endInput.value, "YYYY-MM-DD", EType.INPUT);
      action.changeHighlightDate(EStandard.STARTDATE, startInput.value, "YYYY-MM-DD", EType.INPUT);
    });

    const { startDate, endDate } = result.current.value;
    expect(endDate.selectedDate).toBe("");
    expect(endDate.selectedDate).not.toBe(endInput.value);
    expect(startDate.selectedDate).toBe(startInput.value);
  });
});
