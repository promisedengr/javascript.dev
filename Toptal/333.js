function solution(N) {
  // write your code in JavaScript (Node.js 8.9.4)
  if (N === 1 || N === 0) {
    return '';
  }

  const unsignedN = N > 0 ? N : -N;
  let binaryN = unsignedN.toString(2);

  if (N > 0) {
    const length = binaryN.length;
    const reversedN = 2 ** length - unsignedN;
    binaryN = reversedN.toString(2);

    for (let i = length - binaryN.length - 1; i >= 0; i -= 1) {
      binaryN = `${0}${binaryN}`;
    }
  }

  return binaryN
    .split('')
    .map(digit => digit === '0' ? 'R' : 'L')
    .reverse()
    .join('');
}

console.log(solution(21));