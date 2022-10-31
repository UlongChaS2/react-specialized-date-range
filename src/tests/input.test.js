import "@testing-library/jest-dom";
// import * as React from "react";

import { render } from "@testing-library/react";
import DateInput from "../components/DateInput";

describe("DateInput test", () => {
  it("should render DateInput", () => {
    render(<DateInput />);
  });
});
