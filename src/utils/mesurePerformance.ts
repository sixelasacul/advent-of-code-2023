// Until this is released I can't use console.timeLog properly
// https://github.com/oven-sh/bun/commit/bc114fb9d3cceeabc02c5cffa17bb3821b115c3f
export function measurePerformance<T>(functionToMeasure: () => T) {
  const start = performance.now()
  const result = functionToMeasure()
  const end = performance.now()
  const duration = Math.ceil((end - start) * 100) / 100
  return {
    duration,
    result
  }
}
