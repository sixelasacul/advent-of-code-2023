import { readDayInput } from "../../utils/readInput.js";

type ScanMap = string[][]
type Position = [number, number]
type Type = '|' | '-' | 'L' | 'J' | '7' | 'F' | '.' | 'S'
interface Pipe {
  type: Type
  position: Position
}

// Move input in index.ts, or in runDay?
const input = readDayInput(10)

function findStartPoint(scanMap: ScanMap): Position {
  for (let i = 0; i < scanMap.length; i++) {
    const row = scanMap[i]!
    const result = row.indexOf('S')
    if (result > -1) {
      return [result, i]
    }
  }
  return [0, 0]
}

function arePipesCompatible(first: Pipe, second: Pipe) {
  const xDiff = first.position[0] - second.position[0]
  const yDiff = first.position[1] - second.position[1]

  // Perhaps I could just switch first and second around to avoid re-writing checks

  if (xDiff !== 0 && yDiff !== 0) {
    throw new Error(`Diagonal pipes are not supported [${JSON.stringify(first)}, ${JSON.stringify(second)}]`)
  }

  if (first.type === 'S' && second.type !== '.' || second.type === 'S' && first.type === '.') {
    return true
  }

  // first second
  if (xDiff < 0) {
    return first.type === 'L' && second.type === 'J'
    || first.type === 'F' && second.type === '7'
    || first.type === '-' && second.type === '-'
    // Could be combine with first two conditions
    || first.type === '-' && second.type === 'J'
    || first.type === '-' && second.type === '7'
  }
  // first second
  if (xDiff > 0) {
    return second.type === 'L' && first.type === 'J'
      || second.type === 'F' && first.type === '7'
      || second.type === '-' && first.type === '-'
      // Could be combine with first two conditions
      || second.type === '-' && first.type === 'J'
      || second.type === '-' && first.type === '7'
  }
  // first
  // second
  if (yDiff < 0) {
    return first.type === 'F' && second.type === 'L'
    || first.type === '7' && second.type === 'J'
    || first.type === '|' && second.type === '|'
    // Could be combine with first two conditions
    || first.type === '|' && second.type === 'L'
    || first.type === '|' && second.type === 'J'
  }
  // second
  // first
  if (yDiff > 0) {
    return second.type === 'F' && first.type === 'L'
    || second.type === '7' && first.type === 'J'
    || second.type === '|' && first.type === '|'
    // Could be combine with first two conditions
    || second.type === '|' && first.type === 'L'
    || second.type === '|' && first.type === 'J'
  }

  throw new Error(`Given pipes are the same node [${JSON.stringify(first)}, ${JSON.stringify(second)}]`)
}

function findNextPipe(currentPipe: Pipe, scanMap: ScanMap, loop: Map<string, number>, step: number) {
  const [currentX, currentY] = currentPipe.position
  const possiblePositions = [
    [currentX, currentY + 1],
    [currentX, currentY - 1],
    [currentX + 1, currentY],
    [currentX - 1, currentY]
  ]
  for (const [x, y] of possiblePositions) {
    if (!x || !y) continue
    const type = (scanMap[x] ?? [])[y]
    const loopKey = `${x},${y}`
    if (!type || loop.has(loopKey)) continue
    const pipe: Pipe = { type: type as Type, position: [x, y] }
    if (loop.has(loopKey) || !arePipesCompatible(currentPipe, pipe)) continue
    loop.set(loopKey, step + 1)
    findNextPipe(pipe, scanMap, loop, step + 1)
  }
}

export function runPart1() {
  const scanMap = input.trim().split('\n').map((line) => line.split(''))
  const position = findStartPoint(scanMap)
  const loop = new Map<string, number>([[`${position[0]},${position[1]}`, 0]])
  findNextPipe({
    type: 'S',
    position
  }, scanMap, loop, 0)
  // console.log(loop)
}
