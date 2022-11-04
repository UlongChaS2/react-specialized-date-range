import * as React from "react";
import { useTranslation } from "react-i18next";
import { EMode, EStandard, IDateInputProps } from "../@types/date";
import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";
import {
  checkSetFormatRegExr,
  checkYYYYMMDD,
  converToProperDeafultFormat,
  findSpecialCharacterStr,
  formattingNumToDate,
  replaceOnlyNum,
} from "../utils/dateFormat";

export default function DateInput({ standard, setIsActive, value }: IDateInputProps) {
  const { t } = useTranslation();
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, placeholder, mode, format } = option;

  const [text, setText] = React.useState("");

  React.useEffect(() => {
    value && setText(value);
  }, []);

  React.useEffect(() => {
    // NOTE: Error 관리 - format 구분자와 disabledDates의 배열 원소들의 구분자가 달랐을 때 나오는 error
    if (disabledDates) {
      const disabledDatesStart = checkSetFormatRegExr(format, disabledDates[0]);
      const disabledDatesEnd = checkSetFormatRegExr(format, disabledDates[1]);

      if (!disabledDatesStart || !disabledDatesEnd)
        throw new Error("Set limits according to the format you set.");
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
        const writeDay = converToProperDeafultFormat(newDate, format);
        const disabledDateStart = disabledDates
          ? converToProperDeafultFormat(disabledDates[0], format)
          : "";
        const disabledDateEnd = disabledDates
          ? converToProperDeafultFormat(disabledDates[1], format)
          : "";

        setText(newDate);

        if (newDate.length === 10 || !newDate) {
          // NOTE: 설정한 날짜 범위가 아닐 경우 제일 마지막으로 설정했던 값으로 변한다. <초기화 시킬 수 있음>

          if (!disabledDates || !newDate)
            return actions.changeHighlightDate(standard, newDate, format, "input");

          disabledDateStart < writeDay && (writeDay < disabledDateEnd || !disabledDateEnd)
            ? actions.changeHighlightDate(standard, newDate, format, "input")
            : setText("");
          // : setText(date[standard].selectedDate);
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
