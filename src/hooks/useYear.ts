import * as React from "react";

interface IUseYearPrams {
  year: number;
}

export default function useYear({ year }: IUseYearPrams) {
  const [years, setYears] = React.useState<Array<number>>();

  React.useLayoutEffect(() => {
    const yearsArr = [];
    for (let i = -1; i < 11; i++) {
      yearsArr.push(Number(String(year).slice(0, 3) + 0) + i);
    }
    yearsArr.length != 0 && setYears(yearsArr);
  }, [year]);

  return { years };
}
