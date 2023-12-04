interface RangeArgs {
  singleLineInput: string;
  columnLength: number;
  charIndex: number;
  charLength: number;
}

interface Range {
  range: string
  start: number
  end?: number
}

interface Ranges {
  top: Range
  bottom: Range
  left: Range
  right: Range
}

export function getRanges({ charIndex, charLength, columnLength, singleLineInput }: RangeArgs): Ranges {
  const isOnTheLeftBorder = charIndex % columnLength === 0
  const isOnTheRightBorder = charIndex + charLength + 1 % columnLength === 0
  
  const topStartRange = charIndex - columnLength - (isOnTheLeftBorder ? 0 : 1)
  const topEndRange = topStartRange + charLength + (isOnTheLeftBorder && !isOnTheRightBorder ? 0 : 1)
  const topRange = singleLineInput.substring(topStartRange, topEndRange + 1)

  const bottomStartRange = charIndex + columnLength - (isOnTheLeftBorder ? 0 : 1)
  const bottomEndRange = bottomStartRange + charLength + (isOnTheLeftBorder && !isOnTheRightBorder ? 0 : 1)
  const bottomRange = singleLineInput.substring(bottomStartRange, bottomEndRange + 1)
  
  const leftStartRange = charIndex - 1
  const leftRange = isOnTheLeftBorder ? "" : singleLineInput.at(charIndex - 1)!
  const rightStartRange = charIndex + charLength
  const rightRange = isOnTheRightBorder ? "" : singleLineInput.at(charIndex + charLength)!
  
  return {
    top: {
      start: topStartRange,
      end: topEndRange,
      range: topRange
    },
    bottom: {
      start: bottomStartRange,
      end: bottomEndRange,
      range: bottomRange
    },
    left: {
      start: leftStartRange,
      range: leftRange
    },
    right: {
      start: rightStartRange,
      range: rightRange
    }
  }
}

export function getRange(args: RangeArgs) {
  const { top, bottom, left, right } = getRanges(args)
  return top.range.concat(bottom.range, left.range, right.range)
}
