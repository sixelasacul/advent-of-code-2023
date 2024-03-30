import { readDayInput } from "../../utils/readInput.js";

// Move input in index.ts, or in runDay?
const input = readDayInput(9)

function getDiffSequence(sequence: number[]): number {
  const newSequence = []
  let isOnlyZero = true
  let previousValue: number = Number.MIN_SAFE_INTEGER

  for (const value of sequence) {
    if (previousValue === Number.MIN_SAFE_INTEGER) {
      previousValue = value
      continue
    }
    const result = value - previousValue
    newSequence.push(result)
    previousValue = value
    if (result !== 0) {
      isOnlyZero = false
    }
  }

  const firstValue = newSequence.at(0)!
  return isOnlyZero ? firstValue : firstValue - getDiffSequence(newSequence)
}

export function runPart2() {
  let result = 0
  for (const line of input.trim().split('\n')) {
    const baseSequence = (line.match(/(-?\d+)/gi) ?? []).map((value) => Number(value))
    result += baseSequence.at(0)! - getDiffSequence(baseSequence)
  }
  return result
}
