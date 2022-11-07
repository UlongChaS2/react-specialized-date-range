import * as React from "react";
import {
  useDatePickerOptionActionsContext,
  useDatePickerOptionValuesContext,
} from "../hooks/useDateOptionContext";
import { useTranslation } from "react-i18next";

import Calendar from "./Calendar";
import DateInput from "./DateInput";

import { EMode, EStandard } from "../@types/date";
import { useOutsideClick } from "../hooks/useOutsideClick";
import { IDatePickerContextValues } from "../@types/dateContext";
import { useDateContext } from "../hooks/useDateContext";
import { convertDateFormat, convertToDeafultFormat } from "../utils/dateFormat";

export default function DatePickerWrapper(props: IDatePickerContextValues) {
  const { i18n } = useTranslation();
  const { action: dateActions } = useDateContext();
  const optionActions = useDatePickerOptionActionsContext();
  const options = useDatePickerOptionValuesContext();
  const { width, height, double, locale, mode, placement, value, disabledDates, format } = options;

  React.useEffect(() => {
    locale && i18n.language !== locale && i18n.changeLanguage(locale);
    optionActions.setInitOption(props);
  }, []);

  React.useEffect(() => {
    if (disabledDates) {
      const convertedEndDate = convertToDeafultFormat(disabledDates[1], format).slice(0, -3);
      convertedEndDate < convertDateFormat().slice(0, -3) &&
        dateActions.setToDisabledEndDate(double, convertedEndDate);
    }
  }, [disabledDates]);

  React.useEffect(() => {
    (value[0] || value[1]) && dateActions.setSelectedDate(double, value, format);
  }, [value]);

  const { isActive, setIsActive, inputRef } = useOutsideClick();

  return (
    <div style={{ width, height }} className='datePickerWrapper' ref={inputRef}>
      <div className='wrapper'>
        <DateInput
          standard={`${double ? EStandard.STARTDATE : EStandard.SINGLE}`}
          setIsActive={setIsActive}
        />
        {double && (
          <DateInput standard={`${double && EStandard.ENDDATE}`} setIsActive={setIsActive} />
        )}
      </div>

      {(mode === EMode.STATIC || (mode === EMode.BASIC && isActive)) && (
        <div className={`wrapper ${mode} ${placement}`}>
          <Calendar standard={`${double ? EStandard.STARTDATE : EStandard.SINGLE}`} />
          {double && <Calendar standard={`${double && EStandard.ENDDATE}`} />}
        </div>
      )}
    </div>
  );
}
