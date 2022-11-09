import * as React from "react";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";
import { useDateContext } from "../hooks/useDateContext";
import { useTranslation } from "react-i18next";

import {
  checkSetFormatRegExr,
  convertToDeafultFormat,
  formattingNumToDate,
} from "../utils/dateFormat";
import { EMode, EStandard, EType, IDateInputProps } from "../@types/date";
import { IDatePickerContextValues } from "../@types/dateContext";

export default function DateInput({ standard, setIsActive, value }: IDateInputProps) {
  const { t } = useTranslation();
  const { value: date, action } = useDateContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, placeholder, mode, format, value: setValue } = option;

  const [text, setText] = React.useState("");

  React.useEffect(() => {
    value && setText(value);
  }, []);

  React.useEffect(() => {
    if (disabledDates) {
      const disabledDatesStart = checkSetFormatRegExr(format, disabledDates[0]);
      const disabledDatesEnd = checkSetFormatRegExr(format, disabledDates[1]);
      const valueStart = checkSetFormatRegExr(format, setValue[0]);
      const valueEnd = checkSetFormatRegExr(format, setValue[1]);

      // NOTE: Error 관리 - format 구분자와 disabledDates의 배열 원소들의 구분자가 달랐을 때 나오는 error
      if (!disabledDatesStart || !disabledDatesEnd)
        throw new Error("Set disabledDates according to the format you set.");

      // NOTE: Error 관리 - format 구분자와 value의 배열 원소들의 구분자가 달랐을 때 나오는 error
      if (!valueStart || !valueEnd) throw new Error("Set value according to the format you set.");

      // NOTE: Error 관리 - disabledStartDate를 startValue보다 크게 지정했을 때 error? 빈배열로?
      // if (
      //   convertToDeafultFormat(disabledDates[0], format) >
      //   convertToDeafultFormat(setValue[0], format)
      // )
      //   throw new Error("Set value greater than disabledStartDate");

      // NOTE: Error 관리 - disabledEndDate를 endValue보다 작게 지정했을 때 error? 빈배열로?
      // if (
      //   convertToDeafultFormat(disabledDates[1], format) >
      //   convertToDeafultFormat(setValue[1], format)
      // )
      //   throw new Error("Set value smaller than disabledEndDate");
    }
  }, [disabledDates]);

  React.useEffect(() => {
    date[standard] &&
      (date[standard].selectedDate || !value) &&
      setText(date[standard].selectedDate);
  }, [date[standard] && date[standard].selectedDate]);

  const handleChangeDate = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;

      if (value.length <= 10) {
        const newDate = formattingNumToDate(value, format);
        const writeDay = convertToDeafultFormat(newDate, format);
        const disabledDateStart = disabledDates
          ? convertToDeafultFormat(disabledDates[0], format)
          : "";
        const disabledDateEnd = disabledDates
          ? convertToDeafultFormat(disabledDates[1], format)
          : "";

        setText(newDate);

        if (newDate.length === 10 || !newDate) {
          // NOTE: 설정한 날짜 범위가 아닐 경우 제일 마지막으로 설정했던 값으로 변한다. <초기화 시킬 수 있음>

          if (!disabledDates || !newDate)
            return action.changeHighlightDate(standard, newDate, format, EType.INPUT);

          disabledDateStart < writeDay && (writeDay < disabledDateEnd || !disabledDateEnd)
            ? action.changeHighlightDate(standard, newDate, format, EType.INPUT)
            : action.changeHighlightDate(standard, "", format, EType.INPUT);
          // : action.changeHighlightDate(standard, date[standard].selectedDate, format, EType.INPUT);
        }
      }
    },
    [text]
  );

  return (
    <div className='inputWrapper'>
      {standard !== EStandard.SINGLE && (
        <label className='inputLabel' role='label'>
          {standard === EStandard.STARTDATE
            ? `${t(EStandard.STARTDATE)}:`
            : `${t(EStandard.ENDDATE)}:`}
        </label>
      )}

      <div className='inputBasicWrapper'>
        <input
          role='input'
          className='inputValue'
          type='text'
          placeholder={placeholder}
          value={text}
          onChange={(e) => handleChangeDate(e)}
          onClick={() => mode === EMode.BASIC && setIsActive(true)}
        />
      </div>
    </div>
  );
}
