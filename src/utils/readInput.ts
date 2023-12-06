import { readFileSync } from 'fs';

export function readDayInput(day: number, part?: number) {
  const partSuffix = part ? `-part${part}` : ''
  return readFileSync(`./src/days/day${day}/input${partSuffix}.txt`).toString()
}
