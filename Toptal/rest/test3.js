function solution(A, B, C) {
  A.sort((a, b) => a - b);
  B.sort((a, b) => a - b);
  C.sort((a, b) => b - a);

  const N = A.length;

  function getLesserCount(arr, num, start = 0) {
    for (let i = start; i < N; i += 1) {
      if (arr[i] >= num) {
        return i;
      }
    }

    return N;
  }

  function getGreaterCount(arr, num, start = 0) {
    for (let i = start; i < N; i += 1) {
      if (arr[i] <= num) {
        return i;
      }
    }

    return N;
  }

  let lastABIndex = 0;
  let lastBCIndex = 0;
  let total = 0;

  for (let i = 0; i < N; i += 1) {
    const ab = getLesserCount(A, B[i], lastABIndex);
    const bc = getGreaterCount(C, B[i], lastBCIndex);
    lastABIndex = ab;
    lastBCIndex = bc;
    total += ab * bc;

    if (total > 1000000000) {
      return -1;
    }
  }

  return total;
}

// N < 40000
// n >= 1000000000 -> -1

console.log(solution([29, 50], [61, 37], [37, 70]));
console.log(solution([29, 60, 61], [61, 37, 60], [37, 70, 71]));
console.log(solution([29, 29], [61, 61], [70, 70]));
console.log(solution([5], [5], [5]));
