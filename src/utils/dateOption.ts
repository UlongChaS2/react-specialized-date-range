import { EStandard } from '../@types/date'

export const refer = (standard: string) =>
  standard === EStandard.SINGLE
    ? EStandard.SINGLE
    : standard === EStandard.STARTDATE
    ? EStandard.ENDDATE
    : EStandard.STARTDATE

export const getDatesDiff = (a: string, b: string) => {
  return Math.abs(Math.ceil((new Date(a).getTime() - new Date(b).getTime()) / (1000 * 3600 * 24)))
}
