import { readDayInput } from "../../utils/readInput.js";

export type Hand = Map<string, number>

export enum Types {
  High = 0,
  OnePair = 1,
  TwoPair = 2,
  ThreeOfKind = 3,
  FullHouse = 4,
  FourOfKind = 5,
  FiveOfKind = 6
}

// Move input in index.ts, or in runDay?
export const input = readDayInput(7)
export const HAND_BID_REGEX = /(\w+) (\d+)/gi

export function getHandMap(handString: string) {
  return handString.split('').reduce((map, card) => {
    map.set(card, (map.get(card) ?? 0) + 1)
    return map
  }, new Map<string, number>())
}

export function getHandRank(handMap: Hand) {
  const values = [...handMap.values()]

  if (handMap.size === 1) return Types.FiveOfKind
  if (handMap.size === 4) return Types.OnePair
  if (handMap.size === 5) return Types.High

  if (values.some((value) => value === 4)) return Types.FourOfKind

  if (values.some((value) => value === 3)) {
    return handMap.size === 2 ? Types.FullHouse : Types.ThreeOfKind
  }

  return Types.TwoPair
}

export function getCardRank(handString: string, isJokerWeakest = false) {
  const card = handString[0]
  const parsedCard = Number(card)

  if (!Number.isNaN(parsedCard)) {
    return parsedCard
  }

  switch(card) {
    case 'T': return 10
    case 'J': return isJokerWeakest ? 1 : 11
    case 'Q': return 12
    case 'K': return 13
    case 'A': return 14
  }
  
  throw new Error(`Unexpected card: ${card}`)
}

export function compareCardRank(firstHand: string, secondHand: string, isJokerWeakest = false) {
  for (let i = 0; i < firstHand.length; i++) {
    const result = getCardRank(firstHand[i]!, isJokerWeakest) - getCardRank(secondHand[i]!, isJokerWeakest)
    if(result !== 0) {
      return result
    }
  }
  // Shouldn't happen
  return 0
}
