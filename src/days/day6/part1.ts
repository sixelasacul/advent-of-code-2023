import { readDayInput } from "../../utils/readInput.js";
import { findRaceSolutions } from "./common.js";

// Move input in index.ts, or in runDay?
const input = readDayInput(6, 1)

export function runPart1() {
  const [timeLines = '', distanceLines = ''] = input.trim().split('\n')
  const timeEntries = timeLines.match(/(\d+)/gi)!.map((time) => Number(time))
  const distanceEntries = distanceLines.match(/(\d+)/gi)!.map((time) => Number(time))
  
  let result = 1

  for (let i = 0; i < timeEntries.length; i++) {
    const time = timeEntries[i]!;
    const distance = distanceEntries[i]!;
    const [min, max] = findRaceSolutions(time, distance)
    result *= max - min + 1
  }

  return result
}

