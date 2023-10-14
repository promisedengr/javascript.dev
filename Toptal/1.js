// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A, B) {
  // write your code in JavaScript (Node.js 8.9.4)
  let mins = {};
  let totalMin = -1;
  let N = A.length;

  for (let i = 0; i < N; i++) {
    let maxValue = A[i] > B[i] ? A[i] : B[i];
    if (totalMin === -1 || totalMin > maxValue) {
      totalMin = maxValue;
    }
    mins[maxValue] = true;
  }
  console.log(mins);
  if (totalMin !== 1) return 1;

  for (let minIndex = 1; minIndex <= N; minIndex++) {
    if (!mins[minIndex]) return minIndex;
  }

  return N + 1;
}




// console.log(solution([1, 2], [1, 2]));
console.log(solution([3, 2, 1, 16, 5], [4, 2, 1, 3, 3]));
