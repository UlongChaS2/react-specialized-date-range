const formatter = new Intl.DateTimeFormat('en', {
  hourCycle: 'h23',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
  timeZoneName: 'short',
})

function partsOffset(dtf: Intl.DateTimeFormat, date: Date) {
  const formatted = dtf.formatToParts(date)
  const filled: number[] = []
  const typeToPos: { [key: string]: number } = {
    year: 0,
    month: 1,
    day: 2,
    hour: 3,
    minute: 4,
    second: 5,
  }

  for (let i = 0; i < formatted.length; i++) {
    const { type, value } = formatted[i]
    const pos = typeToPos[type]

    pos !== undefined && (filled[pos] = parseInt(value, 10))
  }
  return filled
}

function getOffset(parts: number[], date: Date) {
  const [y, M, d, h, m, s] = parts
  const utc = new Date(Date.UTC(y, M - 1, d, h, m, s))
  const offset = (utc.getTime() - date.getTime()) / 60 / 1000

  return offset
}

const timeZoneOffset = Math.ceil(getOffset(partsOffset(formatter, new Date()), new Date()))
const utcNow = Date.now() - timeZoneOffset * 60 * 1000
const timeDiff = timeZoneOffset * 60 * 1000
export const today = new Date(utcNow + timeDiff)
