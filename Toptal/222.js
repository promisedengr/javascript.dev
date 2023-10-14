function Solution(A) {
  let n = A.length;

  if (n <= 2) return n;
  let R = [],
    result = 0;
  for (let i = 0; i < n; i++) {
    R[i] = [];
    R[i][0] = R[i][1] = 1;
  }

  for (i = 1; i < n; i++) {
    for (j = 0; j < i; j++) {
      if (A[j] < A[i] && R[i][0] < R[j][1] + 1) {
        R[i][0] = R[j][1] + 1;
      }

      if (A[j] > A[i] && R[i][1] < R[j][0] + 1) {
        R[i][1] = R[j][0] + 1;
      }
      
      // if (A[i] == A[j]) {
      //   R[i][0] = R[i][1] = 1;
      // }
    }

    if (result < Math.max(R[i][0], R[i][1])) {
      result = Math.max(R[i][0], R[i][1]);
    }
  }

  return result;
}

console.log(Solution([9, 4, 2, 10, 7, 8, 8, 1, 9])); // must be 5
// console.log(Solution([4, 8, 12, 16]));
console.log(Solution([4]));
console.log(Solution([50, 5, 50, 5]));
console.log(Solution([1, 2, 1, 2]));



// you can write to stdout for debugging purposes, e.g.
// print "this is a debug message\n";
// For Ming
// function solution($A) {
//   // write your code in PHP7.0

//   $n = count($A);

//   if ($n == 0) return 0;
//   if ($n == 1) return 1;
//   if ($n == 2) return 2;

//   for ($i = 0; $i < $n; $i++) {
//     $z[$i][0] = $z[$i][1] = 1;
//   }

//   for ($i = 1; $i < $n; $i++) {
//     for ($j = 0; $j < $i; $j++) {
//       if ($A[$i] > $A[$j]) {
//         $z[$i][0] = max($z[$j][1] + 1, $z[$i][0]);
//       } else if ($A[$i] < $A[$j]) {
//         $z[$i][1] = max($z[$j][0] + 1, $z[$i][1]);
//       }
//     }

//     $res = max($z[$i][0], $z[$i][1]);
//   }


//   return $res;

// }


// Corrected
function Solution(A) {
  let n = A.length;
  let R = [],
    result = 0;
  for (let i = 0; i < n; i++) {
    R[i] = [];
    R[i][0] = R[i][1] = 1;
  }

  for (i = 1; i < n; i++) {
    if ((A[i] > A[i - 1]) && R[i][0] < R[i - 1][1] + 1) {
      R[i][0] = R[i - 1][1] + 1;
    }

    if ((A[i] < A[i - 1]) && R[i][1] < R[i - 1][0] + 1) {
      R[i][1] = R[i - 1][0] + 1;
    }

    if (result < Math.max(R[i][0], R[i][1])) {
      result = Math.max(R[i][0], R[i][1]);
    }
  }

  return result;
}