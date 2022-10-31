import * as React from "react";

import DatePickerWrapper from "./components/DatePickerWrapper";
import DatePickerOptionProvider from "./context/DatePickerOptionProvider";
import DateProvider from "./context/DateProvider";

interface IAppProvideProps {
  contexts: React.FunctionComponent<any>[];
  children: JSX.Element;
}

const DatePickerProvide = ({ contexts, children }: IAppProvideProps) =>
  contexts.reduce((prev, context) => React.createElement(context, { children: prev }), children);

function DatePicker(props: any) {
  return (
    <DatePickerProvide contexts={[DatePickerOptionProvider, DateProvider]}>
      <DatePickerWrapper {...props} />
    </DatePickerProvide>
  );
}

export default DatePicker;
