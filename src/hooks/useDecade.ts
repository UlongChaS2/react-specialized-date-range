import * as React from 'react'

interface IUseDecadePrams {
  year: number
}

export default function useDecade({ year }: IUseDecadePrams) {
  const [decades, setDecades] = React.useState<Array<number>>([])

  React.useLayoutEffect(() => {
    const decadesArr: number[] = []

    for (let i = -1; i < 11; i++) {
      decadesArr.push(Number(String(year).slice(0, 2) + '00') + i * 10)
    }

    decadesArr.length !== 0 && setDecades(decadesArr)
  }, [year])

  return { decades }
}
