import React from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./DatePicker";
import "./lang/i18n";

import "./assets/styles/index.css";
import "./assets/styles/initialize.css";
import "./assets/styles/font.css";
import "./assets/styles/datePicker.css";

const datePickerProps = {
  width: "580px",
  // double: false,
  // disabledDates: ["2022-10-01", ""],
  // disabledDates: ["", "2022-10-01"],
  // disabledDates: ["2020-01-08", "2022-12-15"],
  // disabledDates: ["01-10-2022", ""],
  // disabledDates: ["", "01-10-2022"],
  // disabledDates: ["01-01-1900", "31-12-2022"],
  // disabledDates: ["10-01-2022", ""],
  // disabledDates: ["", "10-01-2022"],
  // disabledDates: ["01-08-2020", "12-15-2022"],
  mode: "static",
  format: "YYYY-MM-DD",
  // format: "DD-MM-YYYY",
  // format: "MM-DD-YYYY",
  placeholder: "YYYY-MM-DD",
  // placeholder: "DD-MM-YYYY",
  // placeholder: "MM-DD-YYYY",
  // placement: "top",
  // value: ["01-02-2020", ""],
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DatePicker {...datePickerProps} />
  </React.StrictMode>
);
