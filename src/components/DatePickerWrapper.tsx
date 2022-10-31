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

export default function DatePickerWrapper(props: IDatePickerContextValues) {
  const { i18n } = useTranslation();
  const actions = useDatePickerOptionActionsContext();
  const options = useDatePickerOptionValuesContext();
  const { width, height, double, locale, mode, placement } = options;

  React.useEffect(() => {
    locale && i18n.language !== locale && i18n.changeLanguage(locale);
    actions.setInitOption(props);
  }, []);

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
