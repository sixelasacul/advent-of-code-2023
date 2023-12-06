import { readDayInput } from "../../utils/readInput.js";

// Move input in index.ts, or in runDay?
const input = readDayInput(4)
const NUMBERS_REGEX = /(\d+[^:|\d]*)/gi

// Would be nice with recursive regexes and backreferences but it's not that easy
export function runPart1() {
  const games = input.split('\n')
  let result = 0

  for (const game of games) {
    const winningNumbers = new Set<number>()
    const [winningWithId = '', drawn = ''] = game.split('|')
    const [cardId, winning = ''] = winningWithId.split(':')
    
    for (const [,group] of winning.matchAll(NUMBERS_REGEX)) {
      winningNumbers.add(Number(group))
    }
    
    let subResult = 0
    for (const [,group] of drawn.matchAll(NUMBERS_REGEX)) {
      if (winningNumbers.has(Number(group))) {
        if (subResult === 0) {
          subResult = 1
        } else if (subResult > 0) {
          subResult *= 2
        }
      }
    }
    result += subResult
  }
  return result
}

