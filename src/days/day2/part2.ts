import { GAME_REGEX, input } from "./common.js"

export function runPart2() {
  const result = input.trim().split(/\n/).reduce((acc, game) => {
    const max = {
      green: 0,
      blue: 0,
      red: 0
    }
    for (const [, count, color] of game.matchAll(GAME_REGEX)) {
      const parsedCount = Number(count)
      const typedColor = color as keyof typeof max
      if(parsedCount > max[typedColor]) {
        max[typedColor] = parsedCount
      }
    }
    return acc + max.green * max.blue * max.red
  }, 0)
  return result
}
