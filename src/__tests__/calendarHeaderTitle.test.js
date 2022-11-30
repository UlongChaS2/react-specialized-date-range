import '@testing-library/jest-dom'
import React from 'react'
import { act, fireEvent, render, renderHook } from '@testing-library/react'
import { useDateContext } from '../hooks/useDateContext'

import CalendarHeader from '../components/CalendarHeader'
import DateProvider from '../context/DateProvider'

import { EStandard, EUnit } from '../@types/date'
import { convertTitleToUnit } from '../utils/dateFormat'
import { months, thisDay, thisMonth, thisYear } from '../utils/constants/date'

describe('CalendarHeader title test', () => {
  it('has a title ', async () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />)

    getByRole('title')
  })

  it('show init title', async () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />)
    const title = getByRole('title')

    const index = thisDay === 1 ? thisMonth - 2 : thisMonth - 1
    expect(title).toHaveTextContent(`${months[index]} ${thisYear}`)
  })

  it('What to display for the title when you one click the title', () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />)
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    })
    const { action } = result.current

    act(() => {
      fireEvent.click(getByRole('title'))
      action.changeBiggerUnit(EStandard.STARTDATE)
    })

    const { unit, year, month } = result.current.value.startDate
    expect(convertTitleToUnit(unit, year, month)).toBe(String(year))
    expect(unit).toBe(EUnit.MONTH)
  })

  it('What to display for the title when you two clicks the title', () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />)
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    })
    const { action } = result.current

    act(() => {
      fireEvent.click(getByRole('title'))
      fireEvent.click(getByRole('title'))
      action.changeBiggerUnit(EStandard.STARTDATE)
      action.changeBiggerUnit(EStandard.STARTDATE)
    })

    const { unit, year, month } = result.current.value.startDate
    expect(convertTitleToUnit(unit, year, month)).toBe(`${year}-${year < 0 ? year - 9 : year + 9}`)
    expect(unit).toBe(EUnit.YEAR)
  })

  it('What to display for the title when you three clicks the title', () => {
    const { getByRole } = render(<CalendarHeader standard={EStandard.STARTDATE} />)
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    })
    const { action } = result.current

    act(() => {
      fireEvent.click(getByRole('title'))
      fireEvent.click(getByRole('title'))
      fireEvent.click(getByRole('title'))
      action.changeBiggerUnit(EStandard.STARTDATE)
      action.changeBiggerUnit(EStandard.STARTDATE)
      action.changeBiggerUnit(EStandard.STARTDATE)
    })

    const { unit, year, month } = result.current.value.startDate
    expect(convertTitleToUnit(unit, year, month)).toBe(
      `${year}-${year < 0 ? year - 90 : year + 90}`,
    )
    expect(unit).toBe(EUnit.DECADE)
  })
})
