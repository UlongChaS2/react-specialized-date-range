import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import CalendarHeader from "../components/CalendarHeader";
import { EStandard, ELanguage } from "../@types/date";
import { thisMonth, thisYear } from "../utils/constants/date";
import i18n from "../lang/i18n";

describe("CalendarHeader btn test", () => {
  it("have two arrow buttons and a title", async () => {
    render(<CalendarHeader standard={EStandard.STARTDATE} />);
    const title = screen.getByRole("title");

    // await waitFor(() => {
    //   i18n.changeLanguage(ELanguage.KO);
    //   expect(title).toHaveTextContent(`${thisYear} ${thisMonth}월`);
    // });

    // await waitFor(() => {
    //   i18n.changeLanguage(ELanguage.JA);
    //   expect(title).toHaveTextContent(`${thisYear}年 ${thisMonth}月`);
    // });

    screen.getByText("«");
    screen.getByText("»");
  });

  // it("should change title to last month", () => {
  //   render(<CalendarHeader />);
  // });
});
// await waitFor(() => {
//   i18n.changeLanguage(ELanguage.EN);
//   expect(title).toHaveTextContent("start date");
// });
