import React from "react";
import i18n from "../lang/i18n";
import { I18nextProvider } from "react-i18next";
import { render } from "@testing-library/react";

const renderWithi18next = (Component) => {
  const Comp = React.cloneElement(Component, {
    changeLanguage: (lng) => {
      i18n.changeLanguage(lng);
      rerender(<I18nextProvider i18n={i18n}>{Comp}</I18nextProvider>);
    },
  });
  const defaultRender = render(<I18nextProvider i18n={i18n}>{Comp}</I18nextProvider>);
  const { rerender } = defaultRender;
  return defaultRender;
};

export default renderWithi18next;
