import { readDayInput } from "../../utils/readInput.js";

type Position = [number, number]

// Move input in index.ts, or in runDay?
const input = readDayInput(11)

function computeDistance([firstX, firstY]: Position, [secondX, secondY]: Position) {
  const euclideanDistance = Math.sqrt((firstX - secondX) ** 2 + (firstY - secondY) ** 2)
  const steps = Math.abs(firstY - secondY)
  // To represent the fact that we need to count the number of steps between 2
  // galaxies, we use `sqrt(2)` to count for the triangle representing each step
  // between each row.
  return Math.round(euclideanDistance - steps + steps * Math.sqrt(2))
}

export function runPart1() {
  const lines = input.trim().split('\n')
  const foundGalaxies = new Map<string, Position>()
  const mappedGalaxies = new Set<string>()

  for (let y = 0; y < lines.length; y++) {
    const line = lines[y]!
    const galaxies = line.matchAll(/(#)/gi)
    for (const galaxy of galaxies) {
      const x = galaxy.index

      if (x === undefined) {
        // Shouldn't happen
        continue
      }

      const key = `${x},${y}`
      foundGalaxies.set(key, [x, y])

      for (const [foundKey, foundPosition] of foundGalaxies) {
        const pairKey = `${key}:${foundKey}`
        // Not super smart
        const oppositePairKey = `${foundKey}:${key}`
        if (foundKey === key
          || mappedGalaxies.has(pairKey)
          || mappedGalaxies.has(oppositePairKey)) {
          continue
        }

        const distance = computeDistance([x, y], foundPosition)
        // if (pairKey === '5,11:1,6') {
          // console.log(pairKey, distance)
        // }
      }
    }
  }
}
