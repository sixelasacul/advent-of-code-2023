import chalk from 'chalk'
import { measurePerformance } from "./mesurePerformance.js";

function logPart(partNumber: number, partFunction: () => unknown) {
  const {duration, result} = measurePerformance(partFunction)
  console.log(`${chalk.dim(`[${duration.toFixed(2)}ms]`)} Part ${partNumber}: ${chalk.green(result)}`)
}

export function runDay(day: number, part1Function: () => unknown, part2Function: () => unknown = () => {}) {
  console.group(chalk.underline(`Day ${day}`))
  
  logPart(1, part1Function)
  logPart(2, part2Function)
    
  console.log('-----')
  console.groupEnd()
}
