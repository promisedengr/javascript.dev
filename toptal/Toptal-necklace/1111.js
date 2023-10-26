// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

// For Jin Lee
var beadsArray = [];


function findBeads(startValue, index, A) {
  beadsArray.push(index);
  if (A[index] !== startValue) {
    findBeads(startValue, A[index], A);
  } else {
    return index;
  }
}

function solution(A) {
  // write your code in JavaScript (Node.js 8.9.4)

  var l = A.length;
  var i = 0;
  var necklaces = [];
  var prevLength = 0;
  var startValue = 0;


  if (l > 1000000) {
    return -1;
  }

  for (i = 0; i < l; i++) {
    startValue = i;

    if (!Number.isInteger(A[startValue]) || A[startValue] >= l) return -1;

    if (beadsArray.indexOf(startValue) === -1) {
      findBeads(startValue, i, A);
      necklaces.push(beadsArray.length - prevLength);
      prevLength = beadsArray.length;
    }
  }
  
  return Math.max(...necklaces);

}

B = [5, 4, 0, 3, 1, 6, 2];
// B = [5, 0, 'a', 6, 2];
T = solution(B);
console.log(T);
