import "@testing-library/jest-dom";
import React from "react";
import { act, fireEvent, render, renderHook } from "@testing-library/react";
import { useDateContext } from "../hooks/useDateContext";

import CalendarHeader from "../components/CalendarHeader";
import DateProvider from "../context/DateProvider";

import { EDirection, EStandard } from "../@types/date";
import { months, thisDay, thisMonth, thisYear } from "../utils/constants/date";
import i18n from "../lang/i18n";

describe("CalendarHeader title test", () => {
  it("has a title ", async () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />);

    getByRole("title");
  });

  it("show init title", async () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />);
    const title = getByRole("title");

    const index = thisDay === 1 ? thisMonth - 2 : thisMonth - 1;
    expect(title).toHaveTextContent(`${months[index]} ${thisYear}`);
  });

  it("What to display for the title when you click the title", () => {});
});
