function solution(inputArray) {
  let output = [];
  inputArray.forEach((str) => {
      let tempStr = str;
      inputArray.forEach(item => {
        if (tempStr.includes(item) && inputArray.indexOf(str) !== inputArray.indexOf(item))
          while (tempStr.indexOf(item) !== -1) tempStr = tempStr.replace(item, '');
      })
      if (tempStr === '') output.push(str);
  })
  return output;
}

console.log(solution(['a', 'b', 'c', 'abc']));
console.log(solution(['a', 'b', 'c', 'cb', 'abc']));
console.log(solution(['do', 'dog']));
console.log(solution(['dogdogbat', 'bat', 'cat', 'dog']));
console.log(solution(['dogdogbatx', 'bat', 'cat', 'dog']));