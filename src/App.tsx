import React from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./DatePicker";
import "./lang/i18n";

import "./assets/styles/index.css";
import "./assets/styles/initialize.css";
import "./assets/styles/font.css";
import "./assets/styles/datePicker.css";
import { convertDateFormat } from "./utils/dateFormat";

const datePickerProps = {
  width: "580px",
  // disabledDates: ["1989-12-31", ""],
  // disabledDates: ["1879-12-31", ""],
  // disabledDates: ["1900-01-01", convertDateFormat()],
  disabledDates: ["2021-12-31", "2190-03-03"],
  mode: "static",
  format: "YYYY-MM-DD",
  placeholder: "YYYY-MM-DD",
  locale: "en",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DatePicker {...datePickerProps} />
  </React.StrictMode>
);
