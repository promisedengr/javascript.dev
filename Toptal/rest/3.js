//Coffe, Plaza, Salad  rest stop Problem.

function solution(A, B, C) {
  const N = A.length;
  A.sort((a, b) => (a - b));
  B.sort((a, b) => (a - b));
  C.sort((a, b) => (a - b));

  console.log(A, B, C);
  let TB = [];
  let startC = 0;
  for (let i = 0; i < N; i++) {
    TB.push(0);
    for (let j = startC; j < N; j++) {
      if (B[i] < C[j]) {
        TB[i] = (N - j);
        startC = j;
        break;
      }
    }
  }

  console.log('TB', TB);

  let count = 0;
  let TA = [];
  let startB = 0;
  for (let i = 0; i < N; i++) {
    TA.push(0);
    for (let j = startB; j < N; j++) {
      if (A[i] < B[j]) {
        TA[i] = (N - j) * TB[i];
        count += TA[i];
        startC = j;
        break;
      }
    }
  }

  console.log('TA', TA);

  return count;

}

console.log(solution([29, 50], [61, 37], [37, 70]));
console.log(solution([29, 29], [61, 61], [70, 70]));
console.log(solution([5], [5], [5]));
