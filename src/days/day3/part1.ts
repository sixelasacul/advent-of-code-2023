import { readInput } from "../../utils/readInput.js";
import { getRange } from "./common.js";

// Move input in index.ts, or in runDay?
const input = readInput('day3')

// May be more efficient to look for all special characters, and find numbers
// that are in that range (using roughly the same calculation)
export function runPart1() {
  const length = input.indexOf('\n')
  const singleLineInput = input.replace(/\n/g, '')

  let result = 0
  // Barely works to restrict the number search to 3 characters
  for (const group of singleLineInput.matchAll(/(\d{1,3})/g)) {
    if (group.index === undefined) {
      // Shouldn't happen
      continue
    }
    const range = getRange({
      charIndex: group.index,
      charLength: group[0].length,
      columnLength: length,
      singleLineInput
    })
    const shouldAdd = /[^\w.]/.test(range)
    result += shouldAdd ? Number(group[0]) : 0
  }
  return result
}

