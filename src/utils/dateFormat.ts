import { ELanguage, EUnit } from "../@types/date";
import i18n from "../lang/i18n";
import { months, thisDay, thisMonth, thisYear } from "./constants/date";

export const getWeekday = (year: number, month: number, day: number, locale: string) => {
  return new Date(year, month, day).toLocaleString(locale, {
    weekday: "short",
  });
};

export const translateOneToTenFormat = (date: number): string => {
  return date >= 10 ? String(date) : `0${date}`;
};

export const dateFormat = (
  format: string = "YYYY-MM-DD",
  year: number = thisYear,
  month: number = thisMonth,
  day: number = thisDay
): string => {
  if (format.startsWith("Y") || format.startsWith("y"))
    return dateFormatYYYYMMDD(format, year, month, day);
  else if (format.startsWith("M") || format.startsWith("m"))
    return dateFormatMMDDYYYY(format, year, month, day);
  else return dateFormatDDMMYYYY(format, year, month, day);
};

export const dateFormatYYYYMMDD = (
  format: string,
  year: number,
  month: number,
  day: number
): string => {
  return `${year}${findSpecialCharacterStr(format)}${translateOneToTenFormat(
    month
  )}${findSpecialCharacterStr(format)}${translateOneToTenFormat(day)}`;
};

export const dateFormatMMDDYYYY = (
  format: string = "MM-DD-YYYY",
  year: number,
  month: number,
  day: number
): string => {
  return `${translateOneToTenFormat(month)}${findSpecialCharacterStr(
    format
  )}${translateOneToTenFormat(day)}${findSpecialCharacterStr(format)}${year}`;
};

export const dateFormatDDMMYYYY = (
  format: string = "DD-MM-YYYY",
  year: number,
  month: number,
  day: number
): string => {
  return `${translateOneToTenFormat(day)}${findSpecialCharacterStr(
    format
  )}${translateOneToTenFormat(month)}${findSpecialCharacterStr(format)}${year}`;
};

export const convertTitleToUnit = (unit: string, year: number, month: number) => {
  if (unit === EUnit.DECADE) return `${(year + "").slice(0, 2)}00-${(year + "").slice(0, 2)}90`;
  if (unit === EUnit.YEAR) return `${(year + "").slice(0, 3)}0-${(year + "").slice(0, 3)}9`;
  if (unit === EUnit.MONTH) return `${year}`;
  if (unit === EUnit.DAY) {
    if (i18n.language === ELanguage.KO) return translateTitleToKo(year, month);
    if (i18n.language === ELanguage.EN) return translateTitleToEn(year, month);
    if (i18n.language === ELanguage.JA) return translateTitleToJa(year, month);
  }
};

const translateTitleToKo = (year: number, month: number) => `${year} ${month}월`;
const translateTitleToEn = (year: number, month: number) => `${months[month - 1]} ${year}`;
const translateTitleToJa = (year: number, month: number) => `${year}年 ${month}月`;

export const findSpecialCharacterStr = (format: string): string => {
  const RegNumOrStr = /[0-9a-zA-Z]/g;
  return format.replace(RegNumOrStr, "").substring(0, 1);
};

export const transformDDMMYYYYtoMMDDYYYY = (value: string) => {
  const num = onlyNum(value);
  let RegDateFmt = /([0-9]{2})([0-9]{2})([0-9]+)/;
  const DataFormat = `$2${findSpecialCharacterStr(value)}$1${findSpecialCharacterStr(value)}$3`;
  return num.replace(RegDateFmt, DataFormat);
};

export const onlyNum = (value: string) => {
  const RegNotNum = /[^0-9]/g;
  return value.replace(RegNotNum, "");
};

export const checkFormatRegExr = (format: string, str: string): boolean => {
  if (!str) return true;

  let numLength: number;
  format.startsWith("Y") ? (numLength = 4) : (numLength = 2);
  const regExp = new RegExp(
    `([0-9a-zA-z]{${numLength}})*${findSpecialCharacterStr(
      format
    )}([0-9a-zA-z]{2})*${findSpecialCharacterStr(format)}([0-9a-zA-z]+)`
  );

  return regExp.test(str);
};
