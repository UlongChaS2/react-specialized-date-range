import "@testing-library/jest-dom";
import { getByTestId, render, waitFor } from "@testing-library/react";
import DateInput from "../components/DateInput";
import renderWithi18next from "./renderWithi18next";
import i18n from "../lang/i18n";
import { ELanguage, EStandard } from "../@types/date";

describe("DateInput Label Lang test", () => {
  it("should test startDate lang", async () => {
    const { container } = renderWithi18next(<DateInput standard={EStandard.STARTDATE} />);
    expect(getByTestId(container, EStandard.STARTDATE)).toBeDefined();

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.EN);
      expect(getByTestId(container, EStandard.STARTDATE)).toHaveTextContent("start date");
    });

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.KO);
      expect(getByTestId(container, EStandard.STARTDATE)).toHaveTextContent("시작일");
    });

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.JA);
      expect(getByTestId(container, EStandard.STARTDATE)).toHaveTextContent("開始日");
    });
  });

  it("should test endDate lang", async () => {
    const { container } = renderWithi18next(<DateInput standard={EStandard.ENDDATE} />);
    expect(getByTestId(container, EStandard.ENDDATE)).toBeDefined();

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.EN);
      expect(getByTestId(container, EStandard.ENDDATE)).toHaveTextContent("end date");
    });

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.KO);
      expect(getByTestId(container, EStandard.ENDDATE)).toHaveTextContent("종료일");
    });

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.JA);
      expect(getByTestId(container, EStandard.ENDDATE)).toHaveTextContent("終了日");
    });
  });
});
