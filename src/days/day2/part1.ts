import { GAME_REGEX, input } from "./common.js"

const goal = {
  red: 12,
  green: 13,
  blue: 14
}

const GAME_ID_REGEX = /^Game (\d+)/i

export function runPart1() {
  const result = input.trim().split(/\n/).reduce((acc, game) => {
    const gameId = Number(game.match(GAME_ID_REGEX)![1])
    for (const [, count, color] of game.matchAll(GAME_REGEX)) {
      if (Number(count) > goal[color as keyof typeof goal]) {
        return acc
      }
    }
    return acc + gameId
  }, 0)
  return result
}

// First try
// const COLORS_REGEX = /(\d+) (\w+)/i
// const result = input.trim().split(/\n/).reduce((acc, game) => {
//   const [gameStr, ...groups] = game.split(/[:,;]/i)
  
//   const gameId = gameStr.match(GAME_ID_REGEX)[1]

//   const matchesGoal = groups.every((group) => {
//     const [, nb, color] = group.match(COLORS_REGEX)
//     return nb <= goal[color]
//   })

//   return matchesGoal ? acc + Number(gameId) : acc
// }, 0)
// console.log(result)
