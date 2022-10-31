import React from "react";
import ReactDOM from "react-dom/client";
import DatePicker from "./DatePicker";
import "./lang/i18n";

import "./assets/styles/index.css";
import "./assets/styles/initialize.css";
import "./assets/styles/font.css";
import "./assets/styles/datePicker.css";
import { todayDashFormat } from "./utils/dateFormat";

const datePickerProps = {
  width: "580px",
  disabledDates: ["1900-05-01", todayDashFormat()],
  mode: "static",
  // placement: "top",
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <DatePicker {...datePickerProps} />
  </React.StrictMode>
);
