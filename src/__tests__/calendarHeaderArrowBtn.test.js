import "@testing-library/jest-dom";
import React from "react";
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { useDateContext } from "../hooks/useDateContext";

import CalendarHeader from "../components/CalendarHeader";
import DateProvider from "../context/DateProvider";

import { months } from "../utils/constants/date";
import { EDirection, EStandard } from "../@types/date";

describe("CalendarHeader btn test", () => {
  it("have two arrow buttons", async () => {
    const { getByText } = render(
      <CalendarHeader standard={EStandard.STARTDATE} />
    );

    getByText("«");
    getByText("»");
  });

  it("What to display for the title when you click the left button is clicked twice", () => {
    const { getByText, getByRole } = render(
      <CalendarHeader standard={EStandard.STARTDATE} />
    );
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    });

    // NOTE: 컴포넌트 event와 context API의 action는 testing에서는 자동적으로 호출이 되지않아 임의로 시나리오를 생각하여 각각 함수 행동을 부여하여
    // 같은 결과 값이 나오게 합니다.
    act(() => {
      fireEvent.click(getByText("«"));
      fireEvent.click(getByText("«"));
      result.current.action.changeTitle(EStandard.STARTDATE, EDirection.LEFT);
      result.current.action.changeTitle(EStandard.STARTDATE, EDirection.LEFT);
    });

    const twice = 2,
      once = 1;
    const DEFyear = getByRole("title").innerHTML.split(" ")[1];
    const DEFmonthIdx = months.indexOf(
      getByRole("title").innerHTML.split(" ")[0]
    );
    const calcMonthIdx = (count) =>
      DEFmonthIdx - count < 0 ? months.length - count : DEFmonthIdx - count;
    const calcYear = (count) =>
      DEFmonthIdx - count < 0 ? DEFyear - 1 : DEFyear;

    const { startDate } = result.current.value;
    expect(startDate.title()).toBe(
      `${months[calcMonthIdx(twice)]} ${calcYear(twice)}`
    );
    expect(startDate.title()).not.toBe(
      `${months[calcMonthIdx(once)]} ${calcYear(once)}`
    );
  });

  it("What to display for the title when you click the right button is clicked twice", () => {
    const { getByText, getByRole } = render(
      <CalendarHeader standard={EStandard.STARTDATE} />
    );
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    });

    act(() => {
      fireEvent.click(getByText("»"));
      fireEvent.click(getByText("»"));
      result.current.action.changeTitle(EStandard.STARTDATE, EDirection.RIGHT);
      result.current.action.changeTitle(EStandard.STARTDATE, EDirection.RIGHT);
    });

    const twice = 2,
      once = 1;
    const DEFyear = getByRole("title").innerHTML.split(" ")[1];
    const DEFmonthIdx = months.indexOf(
      getByRole("title").innerHTML.split(" ")[0]
    );
    const calcMonthIdx = (count) =>
      DEFmonthIdx + count >= 12
        ? DEFmonthIdx + count - months.length
        : DEFmonthIdx + count;
    const calcYear = (count) =>
      DEFmonthIdx + count >= 12 ? +DEFyear + 1 : DEFyear;

    expect(result.current.value.startDate.title()).toBe(
      `${months[calcMonthIdx(twice)]} ${calcYear(twice)}`
    );
    expect(result.current.value.startDate.title()).not.toBe(
      `${months[calcMonthIdx(once)]} ${calcYear(once)}`
    );
  });
});
