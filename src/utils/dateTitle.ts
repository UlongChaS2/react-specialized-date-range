import { IDate } from '../@types/date'

export const changeMonth = (prevDate: IDate, arrow: string): IDate => {
  const num = arrow === 'left' ? -1 : 1
  let dayTitle = { year: prevDate.year, month: prevDate.month }

  if (num < 0 && prevDate.month === 1) {
    dayTitle.month = 12
    dayTitle.year = dayTitle.year + num
  } else if (num > 0 && prevDate.month === 12) {
    dayTitle.month = 1
    dayTitle.year = dayTitle.year + num
  } else dayTitle.month = dayTitle.month + num

  return { ...prevDate, ...dayTitle }
}

export const changeYear = (prevDate: IDate, arrow: string) => {
  const num = arrow === 'left' ? -1 : 1
  return { ...prevDate, year: prevDate.year + num }
}

export const changeDecade = (prevDate: IDate, arrow: string) => {
  const num = arrow === 'left' ? -10 : 10
  return { ...prevDate, year: prevDate.year + num }
}

export const changeCentury = (prevDate: IDate, arrow: string) => {
  const num = arrow === 'left' ? -100 : 100
  return { ...prevDate, year: prevDate.year + num }
}
