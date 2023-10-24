A = [['p', 'a'], ['s', 'p'], ['i', 'n'], ['a', 'i']];
let result = [];  
word(A);
function word(A) {
  
  findLeft(A, A[0][0]);
  result.push(A[0][0]);

  result.push(A[0][1]);
  findRight(A, A[0][1]);

  result = result.join('');
  console.log(result);
}

function findLeft(A, first) {
  let n = A.length;
  for (let j = 1; j < n; j++) {
    if (A[j][1] == first) {          
      findLeft(A, A[j][0]);
      result.push(A[j][0]);
      return;
    }
  }
}

function findRight(A, first) {
  let n = A.length;
  for (let j = 1; j < n; j++) {
    if (A[j][0] == first) {
      result.push(A[j][1]);
      findRight(A, A[j][1]);
      return;
    }
  }
}