import { readDayInput } from "../../utils/readInput.js";

// Move input in index.ts, or in runDay?
const input = readDayInput(4)
const NUMBERS_REGEX = /(\d+[^:|\d]*)/gi

// Would be nice with recursive regexes and backreferences but it's not that easy
export function runPart2() {
  const games = input.trim().split('\n')
  let result = 0
  const cardWins = new Map<number, number>()

  for (const game of games) {
    const winningNumbers = new Set<number>()
    const [winningWithId = '', drawn = ''] = game.split('|')
    const [withId = '', winning = ''] = winningWithId.split(':')
    const cardId = Number(withId.match(/(\d+)/gi))
    
    for (const [,group] of winning.matchAll(NUMBERS_REGEX)) {
      winningNumbers.add(Number(group))
    }
    
    let numberOfWins = 0
    const instances = (cardWins.get(cardId) ?? 0) + 1
    cardWins.set(cardId, instances)

    for (const [,group] of drawn.matchAll(NUMBERS_REGEX)) {
      if (winningNumbers.has(Number(group))) {
        const index = cardId + ++numberOfWins
        cardWins.set(index, instances + (cardWins.get(index) ?? 0))
      }
    }
  }

  // Could be done within the for loop line 27
  for (const [, wins] of cardWins) {
    result += wins
  }

  return result
}

