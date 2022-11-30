import * as React from 'react'
import '@testing-library/jest-dom'
import { renderHook, act } from '@testing-library/react'
import { useDateContext } from '../hooks/useDateContext'

import DateProvider from '../context/DateProvider'
import i18n from '../lang/i18n'

import { convertTitleToUnit } from '../utils/dateFormat'
import { months } from '../utils/constants/date'
import { ELanguage } from '../@types/date'

describe('CalendarHeader title Lang test', () => {
  it('should ko title when unit is month', () => {
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    })
    const { unit, year, month } = result.current.value.startDate

    act(() => {
      i18n.changeLanguage(ELanguage.KO)
    })

    expect(convertTitleToUnit(unit, year, month, i18n.language)).toBe(`${year} ${month}월`)
  })

  it('should en title when unit is month', () => {
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    })
    const { unit, year, month } = result.current.value.startDate

    act(() => {
      i18n.changeLanguage(ELanguage.EN)
    })

    expect(convertTitleToUnit(unit, year, month, i18n.language)).toBe(
      `${months[month - 1]} ${year}`,
    )
  })

  it('should ja title when unit is month', () => {
    const { result } = renderHook(() => useDateContext(), {
      wrapper: ({ children }) => <DateProvider>{children}</DateProvider>,
    })
    const { unit, year, month } = result.current.value.startDate

    act(() => {
      i18n.changeLanguage(ELanguage.JA)
    })

    expect(convertTitleToUnit(unit, year, month, i18n.language)).toBe(`${year}年 ${month}月`)
  })
})
