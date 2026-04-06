const normalizeLines = (value) => {
  if (!value) {
    return []
  }
  return value.replace(/\r/g, '').split('\n')
}

export const buildLineDiff = (currentValue, targetValue) => {
  const currentLines = normalizeLines(currentValue)
  const targetLines = normalizeLines(targetValue)
  const rows = currentLines.length
  const cols = targetLines.length

  const matrix = Array.from({ length: rows + 1 }, () => Array(cols + 1).fill(0))

  for (let row = 1; row <= rows; row += 1) {
    for (let col = 1; col <= cols; col += 1) {
      if (currentLines[row - 1] === targetLines[col - 1]) {
        matrix[row][col] = matrix[row - 1][col - 1] + 1
      } else {
        matrix[row][col] = Math.max(matrix[row - 1][col], matrix[row][col - 1])
      }
    }
  }

  const diff = []
  let row = rows
  let col = cols

  while (row > 0 && col > 0) {
    if (currentLines[row - 1] === targetLines[col - 1]) {
      diff.unshift({
        type: 'same',
        currentLine: currentLines[row - 1],
        targetLine: targetLines[col - 1],
      })
      row -= 1
      col -= 1
    } else if (matrix[row - 1][col] >= matrix[row][col - 1]) {
      diff.unshift({
        type: 'removed',
        currentLine: currentLines[row - 1],
        targetLine: '',
      })
      row -= 1
    } else {
      diff.unshift({
        type: 'added',
        currentLine: '',
        targetLine: targetLines[col - 1],
      })
      col -= 1
    }
  }

  while (row > 0) {
    diff.unshift({
      type: 'removed',
      currentLine: currentLines[row - 1],
      targetLine: '',
    })
    row -= 1
  }

  while (col > 0) {
    diff.unshift({
      type: 'added',
      currentLine: '',
      targetLine: targetLines[col - 1],
    })
    col -= 1
  }

  return diff
}
