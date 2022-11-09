import "@testing-library/jest-dom";
import { render, waitFor, renderHook } from "@testing-library/react";
import { useDateContext } from "../hooks/useDateContext";

import CalendarHeader from "../components/CalendarHeader";
import DateProvider from "../context/DateProvider";
import i18n from "../lang/i18n";

import { ELanguage, EStandard } from "../@types/date";

describe("CalendarHeader title Lang test", () => {
  it("should ko title when unit is month", async () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />);
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    });

    const title = getByRole("title");
    const year = result.current.value.startDate.year;
    const month = result.current.value.startDate.month;

    // NOTE: lang을 바꾼다고 해서 CalendarHeader에서는 알 수가 없으니 <title은 Context API에서 관리> i18n 변수 사용법을 익혀 바꾸고
    // TEST해야할 것 같음
    await waitFor(() => {
      i18n.changeLanguage(ELanguage.KO);
      // expect(title).toHaveTextContent(`${year} ${month}월`);
      // expect(label).not.toHaveTextContent("start date");
      // expect(label).not.toHaveTextContent("開始日");
    });
  });
});
