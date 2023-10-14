let input = [[1,1,0],
[1,0,1],
[0,0,1]];

let input2 = [[1,1,0,1,0,0,0,1,1,1,0],
[1,0,0,1,1,0,0,0,1,0,0],
[0,0,0,1,1,1,0,0,0,0,0],
[1,0,0,0,1,1,1,0,0,0,0],
[0,0,0,0,0,1,1,1,0,0,0],
[1,0,1,0,0,0,1,0,0,0,0],
[0,0,0,0,0,0,0,1,0,0,0],
[1,0,1,0,1,0,0,0,0,0,0],
[0,0,0,0,1,0,0,1,0,0,0],
[1,0,1,1,1,0,1,1,0,0,0],
[0,0,0,0,0,0,0,0,0,0,0]];

console.log(processData(input));
function fill(arr, i, j, m, n) {
  // return if any of the indices is out of matrix bounds
  if (i < 0 || i >= m || j < 0 || j >= n) 
      return 0;
  else if (arr[i][j] == 1) {
    // zero the element for a "visited"-like indicator,
      // so every connected component is recursed through
      // only once 
      arr[i][j] = 0;
      // return 1 as the component size, adding the recursive
      // returns for all its possible neighbours
      return 1+fill(arr, i-1, j-1, m, n)
              +fill(arr, i-1, j, m, n)
              +fill(arr, i-1, j+1, m, n)
              +fill(arr, i, j-1, m, n)
              +fill(arr, i, j+1, m, n)
              +fill(arr, i+1, j-1, m, n)
              +fill(arr, i+1, j, m, n)
              +fill(arr, i+1, j+1, m, n);
  }
  return 0;
}
function processData(input) {
  // read and parse the input
  var arr = input.split(/\r?\n/);
  var m = arr[0], n = arr[1], chck = 0, rslt = 0;
  arr = arr.slice(2).map(e => e.split(' ').map(Number));
  // cycle through every element of the matrix
  for (var i = 0; i < m; i++) {
      for (var j = 0; j < n; j++) {
          // check arr[i][j] value and count its component
          chck = fill(arr, i, j, m, n);
          // compare this component size with max size yet
          rslt = (chck > rslt) ? chck : rslt;
      }
  }
  console.log(rslt);
} 