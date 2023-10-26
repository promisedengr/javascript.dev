// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)


  var l = A.length;

  if (2 >= l) return l;

  var tempArray = [], longest = 0;
  var index = 0;

  for (index = 0; index < l; index++) {
    tempArray[index] = [];
    tempArray[index][0] = 1;
    tempArray[index][1] = 1;
  }

  for (index = 1; index < l; index++) {

    if (A[index] > A[index - 1] && (tempArray[index - 1][1] + 1) > tempArray[index][0]) {
      tempArray[index][0] = tempArray[index - 1][1] + 1;
    }

    if (A[index] < A[index - 1] && (tempArray[index - 1][0] + 1) > tempArray[index][1]) {
      tempArray[index][1] = tempArray[index - 1][0] + 1;
    }


    if (longest < Math.max(tempArray[index][0], tempArray[index][1])) {
      longest = Math.max(tempArray[index][0], tempArray[index][1]);
    }
  }

  return longest;

}