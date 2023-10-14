function solution(S) {
  const aCount = (S.match(/a/g) || []).length
  const n = S.length

  if (aCount % 3 != 0) return 0
  if (aCount == 0) return (n-1) * (n-2) / 2
  if (n < 3) return 0

  const k = aCount / 3 // count of 'a' in a chunk
  let aIndex = 0

  let k1, k2, k3, k4

  for (let i = 0; i < n; i ++) {
    if (S[i] == 'a') {
      ++aIndex

      switch(aIndex) {
        case k:
          k1 = i
          break
        case k+1:
          k2 = i
          if (k == 1) k3 = i;
          break
        case 2*k:
          k3 = i
          break
        case 2*k+1:
          k4 = i
          return (k2-k1) * (k4-k3)
      }
    }
  }
}

console.log(solution('babaa'))
console.log(solution('ababa'))
console.log(solution('aba'))
console.log(solution('bbbbb'))
console.log(solution('aa'))
console.log(solution('bb'))
console.log(solution('bba'))