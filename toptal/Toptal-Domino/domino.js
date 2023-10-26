// function match(prev, next) {
//   if (next[0] === prev[prev.length - 1]) {
//     return `${prev}${next}`;
//   }

//   return false;
// }

// function domino(S) {
//   const a = S.replace(/-/g, '').split(",");
//   const temp = [a[0]];
//   let tmpString = a[0];

//   for (let i = 1; i < a.length; i++) {
//     const result = match(tmpString, a[i]);
//     if (result) {
//       tmpString = result;
//     } else {
//       temp.push(tmpString);
//       tmpString = a[i];
//     }
//   }

//   temp.push(tmpString);

//   let maxLen = temp[0].length;
//   for (let i = 1; i < temp.length; i++) {
//     if (maxLen < temp[i].length) {
//       maxLen = temp[i].length;
//     }
//   }

//   return maxLen / 2;
// }

function find(i, a, c) {
  if (i === a.length - 1) {
    return c;
  }

  if (a[i][1] === a[i+1][0]) {    
    c++;
    return find(i+1, a, c);
  } else {
    return c;
  }
}

function domino(S) {
  const a = S.replace(/-/g, '').split(",");
  let results = [];

  for (let i = 0; i < (a.length - 2); i++) {
    first = i;
    temp = find(first, a, 1);
    results.push(temp);
  }

  return Math.max(...results);
}

// 1. "6-3"
// 2. "4-3,5-1,2-2,1-3,4-4"
// 3. "1-1,3-5,5-2,2-3,2-4"
console.log(domino("1-1,3-5,5-2,2-3,2-4"));

console.log(domino("5-5,5-5,4-4,5-5,5-5,5-5,5-5,5-5,5-5,5-5")) // 7
console.log(domino("1-1,3-5,5-5,5-4,4-2,1-3")) // 4
console.log(domino("1-2,2-2,3-3,3-4,4-5,1-1,1-2")) // 3