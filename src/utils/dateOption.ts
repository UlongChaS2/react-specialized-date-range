import { EStandard } from "../@types/date";

export const refer = (standard: string) =>
  standard === EStandard.SINGLE
    ? EStandard.SINGLE
    : standard === EStandard.STARTDATE
    ? EStandard.ENDDATE
    : EStandard.STARTDATE;
