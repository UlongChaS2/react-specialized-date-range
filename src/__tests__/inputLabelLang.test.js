import * as React from 'react'
import '@testing-library/jest-dom'
import { render, waitFor } from '@testing-library/react'

import DateInput from '../components/DateInput'
import i18n from '../lang/i18n'

import { ELanguage, EStandard } from '../@types/date'

describe('DateInput Label Lang test', () => {
  it('should test startDate ko', async () => {
    const { getByRole } = render(<DateInput standard={EStandard.STARTDATE} />)
    const label = getByRole('label')

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.KO)
      expect(label).toHaveTextContent('시작일')
      expect(label).not.toHaveTextContent('start date')
      expect(label).not.toHaveTextContent('開始日')
    })
  })

  it('should test startDate en', async () => {
    const { getByRole } = render(<DateInput standard={EStandard.STARTDATE} />)
    const label = getByRole('label')

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.EN)
      expect(label).not.toHaveTextContent('시작일')
      expect(label).toHaveTextContent('start date')
      expect(label).not.toHaveTextContent('開始日')
    })
  })

  it('should test startDate ja', async () => {
    const { getByRole } = render(<DateInput standard={EStandard.STARTDATE} />)
    const label = getByRole('label')

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.JA)
      expect(label).not.toHaveTextContent('시작일')
      expect(label).not.toHaveTextContent('start date')
      expect(label).toHaveTextContent('開始日')
    })
  })

  it('should test endDate ko', async () => {
    const { getByRole } = render(<DateInput standard={EStandard.ENDDATE} />)
    const label = getByRole('label')

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.KO)
      expect(label).toHaveTextContent('종료일')
      expect(label).not.toHaveTextContent('end date')
      expect(label).not.toHaveTextContent('終了日')
    })
  })

  it('should test endDate en', async () => {
    const { getByRole } = render(<DateInput standard={EStandard.ENDDATE} />)
    const label = getByRole('label')

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.EN)
      expect(label).not.toHaveTextContent('종료일')
      expect(label).toHaveTextContent('end date')
      expect(label).not.toHaveTextContent('終了日')
    })
  })

  it('should test endDate ja', async () => {
    const { getByRole } = render(<DateInput standard={EStandard.ENDDATE} />)
    const label = getByRole('label')

    await waitFor(() => {
      i18n.changeLanguage(ELanguage.JA)
      expect(label).not.toHaveTextContent('종료일')
      expect(label).not.toHaveTextContent('end date')
      expect(label).toHaveTextContent('終了日')
    })
  })

  it("shouldn't show single Label", async () => {
    const { queryByRole } = render(<DateInput standard={EStandard.SINGLE} />)
    expect(queryByRole('label')).toBeNull()
  })
})
