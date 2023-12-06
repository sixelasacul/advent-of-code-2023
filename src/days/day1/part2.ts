import { readDayInput } from "../../utils/readInput.js";

const input = readDayInput(1)

const LETTER_DIGITS = ['one','two','three','four','five','six','seven','eight','nine']
// Could be possible with only one regex, but it's more complex and less readable
const DIGIT_REGEX = new RegExp(`(\\d|${LETTER_DIGITS.join('|')})`, 'i')
const REVERSED_DIGIT_REGEX = new RegExp(`(\\d|${reverse(LETTER_DIGITS.join('|'))})`, 'i')

function reverse(str: string) {
  return str.split('').reverse().join('')
}

function parseDigit(digit: string) {
  const parsed = Number(digit)
  if(!Number.isNaN(parsed)) return parsed
  switch(digit) {
    case 'one': return 1
    case 'two': return 2
    case 'three': return 3
    case 'four': return 4
    case 'five': return 5
    case 'six': return 6
    case 'seven': return 7
    case 'eight': return 8
    case 'nine': return 9
  }
  throw new Error(`Invalid digit: ${digit}`)
}

export function runPart2() {
  return input.trim().split(/\n/).reduce((acc, line) => {
    const [, first = '0'] = line.match(DIGIT_REGEX) ?? []
    const [, _second = '0'] = reverse(line).match(REVERSED_DIGIT_REGEX) ?? []
    const second = reverse(_second) ?? first
    return acc + Number(`${parseDigit(first)}${parseDigit(second)}`)
  }, 0)
}
