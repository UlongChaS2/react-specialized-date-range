import * as React from "react";
import { useTranslation } from "react-i18next";
import { EMode, EStandard, IDateInputProps } from "../@types/date";
import { IDateContextValues, IDatePickerContextValues } from "../@types/dateContext";
import { useDateActionsContext, useDateValuesContext } from "../hooks/useDateContext";
import { useDatePickerOptionValuesContext } from "../hooks/useDateOptionContext";

export default function DateInput({ standard, setIsActive, value }: IDateInputProps) {
  const { t } = useTranslation();
  const date: IDateContextValues = useDateValuesContext();
  const actions = useDateActionsContext();
  const option: IDatePickerContextValues = useDatePickerOptionValuesContext();
  const { disabledDates, placeholder, mode } = option;

  const [text, setText] = React.useState("");

  React.useEffect(() => {
    value && setText(value);
  }, []);

  React.useEffect(() => {
    if (date[standard]) {
      (date[standard].selectedDate || !value) && setText(date[standard].selectedDate);
    }
  }, [date[standard] && date[standard].selectedDate]);

  const handleChangeDate = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.currentTarget;
      if (value.length <= 10) {
        const RegNotNum = /[^0-9]/g;
        const onlyNum = value.replace(RegNotNum, "");

        let DataFormat: string = "";
        let RegDateFmt: RegExp | string = "";

        if (onlyNum.length <= 6) {
          DataFormat = `$1-$2`;
          RegDateFmt = /([0-9]{4})([0-9]+)/;
        } else if (onlyNum.length <= 8) {
          DataFormat = `$1-$2-$3`;
          RegDateFmt = /([0-9]{4})([0-9]{2})([0-9]+)/;
        }

        const newDate = onlyNum.replace(RegDateFmt, DataFormat);
        setText(newDate);

        if (newDate.length === 10 || !newDate) {
          // NOTE: 설정한 날짜 범위가 아닐 경우 제일 마지막으로 설정했던 값으로 변한다. <초기화 시킬 수 있음>

          if (!disabledDates || !newDate)
            return actions.changeHighlightDateByInput(standard, newDate);

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
        <label className='inputLabel' data-testid={`${standard}`}>
          {standard === EStandard.STARTDATE
            ? `${t(EStandard.STARTDATE)}:`
            : `${t(EStandard.ENDDATE)}:`}
        </label>
      )}

      <div className='inputBasicWrapper'>
        <input
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
