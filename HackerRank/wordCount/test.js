function wordCount(board, word) {
  let ans = 0
  const width = board[0].length
  const height = board.length
  const wLen = word.length
  const dx = [1, 0, 1]
  const dy = [0, 1, 1]
  for (let i = 0; i < height; i++) {
      for (let j = 0; j < width; j++) {
          for (let k = 0; k < 3; k++) {
          let x = i
          let y = j
          let p
          for (p = 0; p < wLen; p++) {
              if (x >= height || y >= width) {
              break
              }
              if (board[x][y] !== word[p]) {
              break
              }
              x += dx[k]
              y += dy[k]
          }
          if (p == wLen) {
              ans++
          }
          }
      }
  }
  return ans
}