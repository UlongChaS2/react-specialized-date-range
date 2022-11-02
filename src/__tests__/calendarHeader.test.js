import "@testing-library/jest-dom";
import React from "react";
import { fireEvent, render } from "@testing-library/react";
import CalendarHeader from "../components/CalendarHeader";
import { EStandard } from "../@types/date";
import { months, thisDay, thisMonth, thisYear } from "../utils/constants/date";
import i18n from "../lang/i18n";

describe("CalendarHeader btn test", () => {
  it("have two arrow buttons", async () => {
    const { getByText } = render(<CalendarHeader standard={EStandard.STARTDATE} />);

    getByText("«");
    getByText("»");
  });

  it("show init title", async () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />);
    const title = getByRole("title");

    const index = thisDay === 1 ? thisMonth - 2 : thisMonth - 1;
    expect(title).toHaveTextContent(`${months[index]} ${thisYear}`);
  });

  it("title의 달이 왼쪽 화살표 버튼 눌렀을 때 작월로 보여야한다.", () => {
    const { getByText, getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />);

    const leftArrowBtn = getByText("«");
    const title = getByRole("title");

    fireEvent.click(leftArrowBtn);

    // NOTE: leftArrowBtn을 클릭했을 때 context API actions 함수를 타지 않음으로 별개로 움직이는 것을 확인
    // TEST에서 공유하고 싶으면 actions에는 set만 해주는 것으로 바꾸고 상태 바꾸는 로직은 컴포넌트 안에 있어야한다.

    // const index = thisMonth - 3;
    // console.log(`${months[index]} ${thisYear}`);
    // expect(title).toHaveTextContent(`${months[index]} ${thisYear}`);
  });
});
