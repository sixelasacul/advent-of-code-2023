import { readInput } from "../../utils/readInput.js";
import { getRanges } from "./common.js";

const input = readInput('day3')

export function runPart2() {
  const length = input.indexOf('\n')
  const singleLineInput = input.replace(/\n/g, '')

  const numberPositions = new Map<number, number>()
  for (const group of singleLineInput.matchAll(/\d+/g)) {
    if (group.index === undefined) {
      // Shouldn't happen
      continue
    }
    for (let i = 0; i < group[0].length; i++) {
      numberPositions.set(group.index + i, Number(group[0]))
    }
  }

  let result = 0
  for (const group of singleLineInput.matchAll(/(\*)/g)) {
    if (group.index === undefined) {
      // Shouldn't happen
      continue
    }
    const { top, bottom, right, left } = getRanges({
      charIndex: group.index,
      charLength: group[0].length,
      columnLength: length,
      singleLineInput
    })
    const matches = []
    for (const { range, start } of [top, bottom, right, left]) {
      for (const group of range.matchAll(/(\d+)/gi)) {
        if (group.index === undefined) {
          // Shouldn't happen
          continue
        }
        matches.push(numberPositions.get(start + group.index))
      }
    }
    if(matches.length === 2) {
      result += (matches[0] ?? 0) * (matches[1] ?? 0)
    }
  }
  return result
}
