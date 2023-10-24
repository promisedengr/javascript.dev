// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
  const n = S.length;
  let i = 0;
  let a = '', b = '';
  
  if (n < 1 || n > 1000000) return '';
  if (!/^[a-z]+$/i.test(S)) return '';

  for (i = n - 1; i >= 0; i--) {
    a = findPrefix(S, n, i);
    b = findSuffix(S, n, i);
    if (a == b) return a.length;
  }

  return 0;
}

function findPrefix(S, n, i) {
  return S.substr(0, i);
}

function findSuffix(S, n, i) {
  return S.substr((n-i), i);
}

console.log(solution("abc"));