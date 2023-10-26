B = [5, 4, 0, 3, 1, 6, 2];
// B = [5, 0, 'a', 6, 2];
T = solution(B);

console.log(T);

// For ming
function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  let n = A.length;
  let beads = [];
  let res = [];
  let c = 0;
  let o = 0;

  if (n > 1000000) {
    return -1;
  }

  for (let i = 0; i < n; i++) {
    o = i;

    if (A[i] >= n || !Number.isInteger(A[i])) {
      return -1;
    }

    if (beads.indexOf(o) === -1) {
      find(o, i);
      res.push(beads.length - c);
      c = beads.length;
    }
  }
  console.log(res);
  return Math.max(...res);

  function find(o, i) {
    beads.push(i);
    
    if (o !== A[i]) {
      return find(o, A[i]);
    } else {
      return i;
    }
  }
}

// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// For jason
// function solution(A) {
//   // write your code in JavaScript (Node.js 8.9.4)

//   let n = A.length;
//   if (n == 0) return 0;
//   if (n > 1000000) {
//     return -1;
//   }

//   let necklaces = [],
//     results = [],
//     prevCount = 0,
//     first = 0;

//   for (let i = 0; i < n; i++) {
//     first = i;

//     if (A[i] >= n || !Number.isInteger(A[i])) {
//       return -1;
//     }

//     if (necklaces.indexOf(first) === -1) {
//       findNecklace(first, i);
//       results.push(necklaces.length - prevCount);
//       prevCount = necklaces.length;
//     }
//   }

//   return Math.max(...results);

//   function findNecklace(first, i) {
//     necklaces.push(i);
//     if (first !== A[i]) {
//       return findNecklace(first, A[i]);
//     } else {
//       return i;
//     }
//   }

// }