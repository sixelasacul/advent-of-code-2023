import { readDayInput } from "../../utils/readInput.js";
import { findRaceSolutions } from "./common.js";

// Move input in index.ts, or in runDay?
const input = readDayInput(6, 2)

// The parser from part1 will just work actually
export function runPart2() {
  const [time = 0, distance = 0] = input
    .trim()
    .split('\n')
    .map((line) => Number(line.split(':')[1]?.trim()))
  
    const [min, max] = findRaceSolutions(time, distance)
    return max - min + 1
}

