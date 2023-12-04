import { readInput } from "../../utils/readInput.js";

const input = readInput('day1')

// Could be possible with only one regex, but it's more complex and less readable
const FIRST_DIGIT_REGEX = /^[a-z]*(\d)/i
const SECOND_DIGIT_REGEX = /(\d)[a-z]*$/i

export function runPart1() {
  return input.trim().split(/\n/).reduce((acc, line) => {
    const [, first = '0'] = line.match(FIRST_DIGIT_REGEX) ?? []
    const [, second = first] = line.match(SECOND_DIGIT_REGEX) ?? []
    return acc + Number(first + second)
  }, 0)
}
