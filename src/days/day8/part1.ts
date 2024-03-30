import { readDayInput } from "../../utils/readInput.js";

// Move input in index.ts, or in runDay?
const input = readDayInput(8)

interface FollowPathArgs {
  index: number
  directions: [string, string];
  path: string;
  end: string;
  nodes: Map<string, [string, string]>;
}

function followPath({directions, index, path, end, nodes}: FollowPathArgs) {
  const pathIndex = index % path.length
  const pathDirection = path[pathIndex]!
  const [left, right] = directions
  const nextNode = pathDirection === 'L' ? left : right

  // console.log(index, pathDirection, nextNode)

  if (nextNode === end || index === path.length - 1) {
    return index
  } else {
    const nextDirections = nodes.get(nextNode)!
    return followPath({
      index: index + 1,
      directions: nextDirections,
      path,
      end,
      nodes
    })
  }

}

export function runPart1() {
  const [path = ''] = input.match(/(\w+)/i) ?? []
  // idk if there's a graph library in node, and whether that's more relevant here
  const nodes = new Map<string, [string, string]>()
  let startPoint: string = ''
  
  for (const [, start, left, right] of input.matchAll(/(\w+) = \((\w+), (\w+)\)/gi)) {
    if (startPoint === '') {
      startPoint = start!
    }
    nodes.set(start!, [left!, right!])
  }

  // Should try to start from the end, like top down labyrinths, and figure out
  // the correct path until it can be matched from the given path.
  // Though some nodes may point to the same node whatever direction, so that may
  // mess up the calculation.

  const finalIndex = followPath({
    directions: nodes.get(startPoint)!,
    index: 0,
    end: 'ZZZ',
    nodes,
    path
  })
  
  return finalIndex + 1
}
