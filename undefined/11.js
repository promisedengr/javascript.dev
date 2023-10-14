// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');


function solution(A, B) {
  // write your code in JavaScript (Node.js 8.9.4)

  let N = A.length;
  let min = 100000;

  for (let i = 0; i < N; i++) {
    if ((A[i] != B[i]) && min > A[i]) {
      min = A[i];
    }
  }

  if (min === 100000) {
    return N + 1;
  } else {
    return min;
  }
}

console.log(solution([1, 2, 4, 3], [1, 3, 2, 3]));
// console.log(solution([3, 2, 1, 6, 5], [4, 2, 1, 3, 3]));


