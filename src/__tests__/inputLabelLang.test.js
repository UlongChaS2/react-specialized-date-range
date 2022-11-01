import "@testing-library/jest-dom";
import { screen, waitFor, render } from "@testing-library/react";
import { ELanguage, EStandard } from "../@types/date";
import DateInput from "../components/DateInput";
import i18n from "../lang/i18n";

describe("DateInput Label Lang test", () => {
  it("should change startDate Label lang per locale", async () => {
    render(<DateInput standard={EStandard.STARTDATE} />);
    const label = screen.getByRole("label");
    expect(label).toBeDefined();

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.EN);
      expect(label).toHaveTextContent("start date");
    });

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.KO);
      expect(label).toHaveTextContent("시작일");
    });

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.JA);
      expect(label).toHaveTextContent("開始日");
    });
  });

  it("should change endDate Label lang per locale", async () => {
    render(<DateInput standard={EStandard.ENDDATE} />);
    const label = screen.getByRole("label");
    expect(label).toBeDefined();

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.EN);
      expect(label).toHaveTextContent("end date");
    });

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.KO);
      expect(label).toHaveTextContent("종료일");
    });

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.JA);
      expect(label).toHaveTextContent("終了日");
    });
  });

  it("should change endDate Label lang per locale", async () => {
    render(<DateInput standard={EStandard.SINGLE} />);
    expect(screen.queryByRole("label")).toBeNull();
  });
});
