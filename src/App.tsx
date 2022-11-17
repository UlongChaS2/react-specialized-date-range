import React from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./DatePicker";
import "./lang/i18n";

import "./assets/styles/index.css";
import "./assets/styles/initialize.css";
import "./assets/styles/datePicker.css";

const datePickerProps = {
  width: "580px",
  double: false,
  // disabledDates: ["", "2100-12-31"],
  // disabledDates: ["1893-12-31", ""],
  // disabledDates: ["1890-12-31", "2100-01-01"],
  disabledDates: ["2018-12-31", "2030-01-01"],
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
