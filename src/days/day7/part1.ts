import { getHandMap, getHandRank, HAND_BID_REGEX, input, compareCardRank, type Types } from "./common.js";

export function runPart1() {
  // Clearly sub-optimal to do 3 loops
  // Would be better if we could sort it as we iterate through the entries
  const list: { bid: number; hand: string; type: Types }[] = []

  for (const [, hand = '', bid = ''] of input.matchAll(HAND_BID_REGEX)) {
    list.push({
      bid: Number(bid),
      hand,
      type: getHandRank(getHandMap(hand))
    })
  }

  list.sort((first, second) => {
    const result = first.type - second.type
    if (result === 0) {
      return compareCardRank(first.hand, second.hand)
    }
    return result
  })

  let result = 0
  for (let i = 0; i < list.length; i++) {
    result += list[i]!.bid * (i + 1)
  }
  return result
}

