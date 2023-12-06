import { readDayInput } from "../../utils/readInput.js";

// Move input in index.ts, or in runDay?
const input = readDayInput(5)
const NUMBERS_REGEX = /(\d+)/gi
const NUMBER_PRESENCE_REGEX = /\d+/i

interface SourceToDestinationMap {
  source: number
  destination: number
  range: number
}

function getDestination(input: number, maps: SourceToDestinationMap[]) {
  for (const { destination, range, source } of maps) {
    if (input >= source && input <= source + range) {
      return destination - source + input
    }
  }
  return input
}

export function runPart1() {
  const [seedsStr = '', ...steps] = input.split('map:')
  const seeds = seedsStr.match(NUMBERS_REGEX)?.map((seedStr) => Number(seedStr)) ?? []

  let min = Number.MAX_SAFE_INTEGER
  for (const seed of seeds) {
    let destination = seed
    // Store in a map
    for (const step of steps) {
      const maps = step
        .split('\n')
        .filter((mapStr) => NUMBER_PRESENCE_REGEX.test(mapStr))
        .map((mapStr) => {
          const [destination = 0, source = 0, range = 0] = mapStr.match(NUMBERS_REGEX)?.map((mapStr) => Number(mapStr)) ?? []
          return {
            destination,
            source,
            range
          }
        })
  
      destination = getDestination(destination, maps)
    }

    if  (destination < min) {
      min = destination
    }
  }

  return min
}

