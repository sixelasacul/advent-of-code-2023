import { readFileSync } from 'fs';

export function readInput(day: string) {
  return readFileSync(`./src/days/${day}/input.txt`).toString()
}
