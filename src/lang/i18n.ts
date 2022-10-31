import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import translationKo from "./translation.ko.json";
import translationEn from "./translation.en.json";
import translationJa from "./translation.ja.json";
import Backend from "i18next-http-backend";
import { ELanguage } from "../@types/date";

const resources = {
  ko: { translation: translationKo },
  en: { translation: translationEn },
  ja: { translation: translationJa },
};

const userLanguage = window.navigator.language.split("-")[0];

i18n
  .use(Backend)
  .use(initReactI18next)
  .init({
    detection: { order: ["path", "navigator"] },
    resources: resources,
    lng: userLanguage || ELanguage.EN,
    fallbackLng: ELanguage.EN,
    debug: true,
    interpolation: { escapeValue: false },
  });

export default i18n;
