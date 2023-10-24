// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(ranks) {
  const n = ranks.length;
  let i = 0;
  let temp = [], result = 0, count = 0;

  if (n < 2 || n > 100000) {
    return '';
  }
  
  for (i = 0; i < n; i++) {
    if (ranks[i] < 0 || ranks[i] > 1000000000) return '';

    if (temp[ranks[i]] === undefined) {
      count = find(ranks, ranks[i] + 1);
      result += count;
      temp[ranks[i]] = count;
    } else {
      result += temp[ranks[i]];
    }
    
  }

  return result;
}

function find(ranks, k) {
  if (ranks.indexOf(k) !== -1) return 1;
  else return 0;
}

console.log(solution([3,4,3,0,2,2,3,0,0]));
console.log(solution([4, 4, 3, 3, 1, 0]));
