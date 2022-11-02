import * as React from "react";
import { useTranslation } from "react-i18next";
import { EMode, EStandard, IDateInputProps } from "../@types/date";
import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";
import { checkFormatRegExr, findSpecialCharacterStr } from "../utils/dateFormat";

export default function DateInput({ standard, setIsActive, value }: IDateInputProps) {
  const { t } = useTranslation();
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, placeholder, mode, format } = option;
  const formatSeparator = findSpecialCharacterStr(format);

  const [text, setText] = React.useState("");

  React.useEffect(() => {
    value && setText(value);
  }, []);

  // NOTE: Error 관리 - format 구분자와 disabledDates의 배열 원소들의 구분자가 달랐을 때 나오는 error
  React.useEffect(() => {
    if (disabledDates) {
      const disabledDatesStart = checkFormatRegExr(format, disabledDates[0]);
      const disabledDatesEnd = checkFormatRegExr(format, disabledDates[1]);
      const formatTest = checkFormatRegExr(format, format);

      if (!formatTest || !disabledDatesStart || !disabledDatesEnd)
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
        const RegNotNum = /[^0-9]/g;
        const onlyNum = value.replace(RegNotNum, "");

        let DataFormat: string = "";
        let RegDateFmt: RegExp | string = "";

        if (onlyNum.length <= 4) {
          DataFormat = `$1${formatSeparator}$2`;
          RegDateFmt = /([0-9]{2})([0-9]+)/;
        } else if ((format.startsWith("Y") || format.startsWith("y")) && onlyNum.length <= 6) {
          DataFormat = `$1${formatSeparator}$2`;
          RegDateFmt = /([0-9]{4})([0-9]+)/;
        } else if (onlyNum.length <= 8) {
          DataFormat = `$1${formatSeparator}$2${formatSeparator}$3`;
          RegDateFmt = /([0-9]{2})([0-9]{2})([0-9]+)/;
        } else if (format.startsWith("Y") || (format.startsWith("y") && onlyNum.length <= 8)) {
          DataFormat = `$1${formatSeparator}$2${formatSeparator}$3`;
          RegDateFmt = /([0-9]{4})([0-9]{2})([0-9]+)/;
        }

        const newDate = onlyNum.replace(RegDateFmt, DataFormat);
        setText(newDate);

        if (newDate.length === 10 || !newDate) {
          // NOTE: 설정한 날짜 범위가 아닐 경우 제일 마지막으로 설정했던 값으로 변한다. <초기화 시킬 수 있음>

          if (!disabledDates || !newDate)
            return actions.changeHighlightDateByInput(standard, newDate);

          console.log(disabledDates[0], value, disabledDates[1]);

          disabledDates[0] < value && value < disabledDates[1]
            ? actions.changeHighlightDateByInput(standard, newDate)
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
        <label className='inputLabel' role='label' data-testid={`${standard}`}>
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
