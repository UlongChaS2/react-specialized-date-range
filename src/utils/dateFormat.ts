import { ELanguage, EUnit } from "../@types/date";
import i18n from "../lang/i18n";
import { months, thisDay, thisMonth, thisYear } from "./constants/date";

export const getWeekday = (year: number, month: number, day: number, locale: string) => {
  return new Date(year, month, day).toLocaleString(locale, {
    weekday: "short",
  });
};

export const convertToDoubleDigits = (date: number): string => {
  return date >= 10 ? String(date) : `0${date}`;
};

export const convertDateFormat = (
  year: number = thisYear,
  month: number = thisMonth,
  day: number = thisDay,
  format: string = "YYYY-MM-DD"
): string => {
  const formatSeparator = findSpecialCharacterStr(format);
  if (checkYYYYMMDD(format)) return dateFormatYYYYMMDD(year, month, day, formatSeparator);
  else if (checkMMDDYYYY(format)) return dateFormatMMDDYYYY(year, month, day, formatSeparator);
  else return dateFormatDDMMYYYY(year, month, day, formatSeparator);
};

export const dateFormatYYYYMMDD = (
  year: number,
  month: number,
  day: number,
  formatSeparator: string
): string => {
  return `${year}${formatSeparator}${convertToDoubleDigits(
    month
  )}${formatSeparator}${convertToDoubleDigits(day)}`;
};

export const dateFormatMMDDYYYY = (
  year: number,
  month: number,
  day: number,
  formatSeparator: string
): string => {
  return `${convertToDoubleDigits(month)}${formatSeparator}${convertToDoubleDigits(
    day
  )}${formatSeparator}${year}`;
};

export const dateFormatDDMMYYYY = (
  year: number,
  month: number,
  day: number,
  formatSeparator: string
): string => {
  return `${convertToDoubleDigits(day)}${formatSeparator}${convertToDoubleDigits(
    month
  )}${formatSeparator}${year}`;
};

const translateTitleToKo = (year: number, month: number) => `${year} ${month}월`;
const translateTitleToEn = (year: number, month: number) => `${months[month - 1]} ${year}`;
const translateTitleToJa = (year: number, month: number) => `${year}年 ${month}月`;

export const convertTitleToUnit = (unit: string, year: number, month: number) => {
  if (unit === EUnit.DECADE) return `${year}-${year < 0 ? year - 90 : year + 90}`;
  if (unit === EUnit.YEAR) return `${year}-${year < 0 ? year - 9 : year + 9}`;
  if (unit === EUnit.MONTH) return `${year}`;
  if (unit === EUnit.DAY) {
    if (i18n.language === ELanguage.KO) return translateTitleToKo(year, month);
    if (i18n.language === ELanguage.EN) return translateTitleToEn(year, month);
    if (i18n.language === ELanguage.JA) return translateTitleToJa(year, month);
  }
};

export const checkYYYYMMDD = (format: string) => format.startsWith("Y") || format.startsWith("Y");
export const checkDDMMYYYY = (format: string) => format.startsWith("D") || format.startsWith("d");
export const checkMMDDYYYY = (format: string) => format.startsWith("M") || format.startsWith("m");

export const findSpecialCharacterStr = (format: string): string => {
  const RegNumOrStr = /[0-9a-zA-Z]/g;
  return format.replace(RegNumOrStr, "").substring(0, 1);
};

export const findYearInStr = (date: string, format: string): number => {
  if (checkYYYYMMDD(format)) return +date.split(findSpecialCharacterStr(format))[0];
  else return +date.split(findSpecialCharacterStr(format))[2];
};

export const findMonthInStr = (date: string, format: string): number => {
  if (checkMMDDYYYY(format)) return +date.split(findSpecialCharacterStr(format))[0];
  else return +date.split(findSpecialCharacterStr(format))[1];
};

export const findDayInStr = (date: string, format: string): number => {
  if (checkYYYYMMDD(format)) return +date.split(findSpecialCharacterStr(format))[2];
  else if (checkMMDDYYYY(format)) return +date.split(findSpecialCharacterStr(format))[1];
  else return +date.split(findSpecialCharacterStr(format))[0];
};

export const findDecadeInYear = (year: string | number): string => {
  return String(year).slice(0, 3);
};

export const convertToDeafultFormat = (value: string, format: string): string => {
  if (checkYYYYMMDD(format) || !value) return value;

  const num = replaceOnlyNum(value);
  let RegDateFmt: RegExp | string = "";
  let DataFormat: string = "";

  if (checkDDMMYYYY(format)) {
    RegDateFmt = /([0-9]{2})([0-9]{2})([0-9]+)/;
    DataFormat = `$3${findSpecialCharacterStr(value)}$2${findSpecialCharacterStr(value)}$1`;
  } else {
    RegDateFmt = /([0-9]{2})([0-9]{2})([0-9]+)/;
    DataFormat = `$3${findSpecialCharacterStr(value)}$1${findSpecialCharacterStr(value)}$2`;
  }

  return num.replace(RegDateFmt, DataFormat);
};

export const replaceOnlyNum = (value: string): string => {
  const RegNotNum = /[^0-9]/g;
  return value.replace(RegNotNum, "");
};

export const formattingNumToDate = (value: string, format: string): string => {
  const onlyNum = replaceOnlyNum(value);
  const formatSeparator = findSpecialCharacterStr(format);

  let DataFormat: string = "";
  let RegDateFmt: RegExp | string = "";

  if (checkYYYYMMDD(format)) {
    if (onlyNum.length <= 6) {
      DataFormat = `$1${formatSeparator}$2`;
      RegDateFmt = /([0-9]{4})([0-9]+)/;
    }
    if (6 < onlyNum.length && onlyNum.length <= 8) {
      DataFormat = `$1${formatSeparator}$2${formatSeparator}$3`;
      RegDateFmt = /([0-9]{4})([0-9]{2})([0-9]+)/;
    }
  } else {
    if (onlyNum.length <= 4) {
      DataFormat = `$1${formatSeparator}$2`;
      RegDateFmt = /([0-9]{2})([0-9]+)/;
    }
    if (4 < onlyNum.length && onlyNum.length <= 8) {
      DataFormat = `$1${formatSeparator}$2${formatSeparator}$3`;
      RegDateFmt = /([0-9]{2})([0-9]{2})([0-9]+)/;
    }
  }

  return onlyNum.replace(RegDateFmt, DataFormat);
};

export const checkSetFormatRegExr = (format: string, str: string): boolean => {
  if (!str) return true;

  let numLength = checkYYYYMMDD(format) ? 4 : 2;
  const regExp = new RegExp(
    `([0-9a-zA-z]{${numLength}})*${findSpecialCharacterStr(
      format
    )}([0-9a-zA-z]{2})*${findSpecialCharacterStr(format)}([0-9a-zA-z]+)`
  );

  return regExp.test(str);
};
