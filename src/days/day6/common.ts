// Quadratic equation: `tx - x^2 - d = 0`,
// where t is the race time and d is the race distance.
export function findRaceSolutions(time: number, distance: number) {
  const delta = time ** 2 - 4 * -1 * -distance

  if (delta < 0) {
    throw new Error('delta is negative, it should not be possible')
  }

  if (delta === 0) {
    throw new Error('may happen but who cares')
  }

  const x1 = (- time + Math.sqrt(delta)) / -2
  const x2 = (- time - Math.sqrt(delta)) / -2
  return [Math.ceil(x1), Math.floor(x2)] as const
}
