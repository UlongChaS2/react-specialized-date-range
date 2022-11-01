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

export const todayDashFormat = (year = thisYear, month = thisMonth, date = thisDay) => {
  return `${year}-${translateOneToTenFormat(month)}-${translateOneToTenFormat(date)}`;
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
