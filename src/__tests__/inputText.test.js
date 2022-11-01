import "@testing-library/jest-dom";

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import DateInput from "../components/DateInput";
import CalendarDay from "../components/CalendarDay";
import { EStandard } from "../@types/date";

describe("DateInput input value test", () => {
  it("has a input box", () => {
    render(<DateInput />);
    screen.getByRole("input");
  });

  it("matches snapshot", () => {
    const { container } = render(<DateInput />);
    expect(container).toMatchSnapshot();
  });

  it("if default value set input value", () => {
    const { getByRole, getAllByText } = render(
      <>
        <DateInput value='2022-01-05' />
        <CalendarDay year={2022} month={1} selectedDate='2022-01-05' />
      </>
    );

    const input = getByRole("input");
    expect(input).toHaveAttribute("value", "2022-01-05");

    const div = getAllByText(5)[0];
    expect(div).toHaveClass("highlight");
  });

  it("should change a value when write in input box", () => {
    render(<DateInput />);

    const input = screen.getByRole("input");
    fireEvent.change(input, {
      target: { value: "2022-01-01" },
    });

    expect(input).toHaveAttribute("value", "2022-01-01");
  });
});
