import { HAND_BID_REGEX, input, type Hand, getHandRank, getHandMap, compareCardRank, getCardRank } from "./common.js"

function applyJokers(handMap: Hand) {
  const newHandMap = new Map(handMap)
  const jokers = newHandMap.get('J') ?? 0
  newHandMap.delete('J')

  let highest: [string, number] = ['2', 0]
  for (const [card, count] of newHandMap) {
    if (count > highest[1] || (count === highest[1] && getCardRank(card, true) > getCardRank(highest[0], true))) {
      highest = [card, count]
    }
  }

  newHandMap.set(highest[0], (newHandMap.get(highest[0]) ?? 0) + jokers)

  return newHandMap
}

export function runPart2() {
  // Clearly sub-optimal to do 3 loops
  // Would be better if we could sort it as we iterate through the entries
  const list: { bid: number; hand: string; type: number }[] = []

  for (const [, hand = '', bid = ''] of input.matchAll(HAND_BID_REGEX)) {
    list.push({
      bid: Number(bid),
      hand,
      type: getHandRank(applyJokers(getHandMap(hand)))
    })
  }

  list.sort((first, second) => {
    const result = first.type - second.type
    if (result === 0) {
      return compareCardRank(first.hand, second.hand, true)
    }
    return result
  })

  let result = 0
  for (let i = 0; i < list.length; i++) {
    result += list[i]!.bid * (i + 1)
  }
  return result
}

