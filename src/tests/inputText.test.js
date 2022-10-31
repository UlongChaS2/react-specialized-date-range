import React from "react";
import { render } from "@testing-library/react";
import DateInput from "../components/DateInput";

describe("DateInput input value test", () => {
  it("matches snapshot", () => {
    const { container } = render(<DateInput />);
    expect(container).toMatchSnapshot();
  });
});
