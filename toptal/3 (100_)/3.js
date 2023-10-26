// you can write to stdout for debugging purposes, e.g.
// console.log('this is a debug message');

function solution(S) {
    // write your code in JavaScript (Node.js 8.9.4)
    let aTotal = 0;
	for (let i = 0; i < S.length; i ++) {
        if (S[i] === "a") {
          aTotal ++;
        }
      }
	if (aTotal % 3 !== 0) {
	  return 0;
	}

    if (aTotal === 0) {
	    if (S.length <= 2) {
	        return 0;
	    } else {
	        return (S.length - 1) * (S.length - 2) / 2;
	    }
	}
	
	const aCount = aTotal / 3;
	let aCountInPart = 0;
	let sPos = 0;
	while (true)
	{
	  if (S[sPos] === "a") {
		aCountInPart ++;
		if (aCountInPart === aCount) {
		  break;
		}
	  }
	  sPos ++;
	}
	let sPos1 = sPos + 1;
	while (true)
	{
	  if (S[sPos1] === "a") {
		break;
	  }
	  sPos1 ++;
	}
	aCountInPart = 0;
	let ePos = S.length - 1;
	while (true)
	{
	  if (S[ePos] === "a") {
		aCountInPart ++;
		if (aCountInPart === aCount) {
		  break;
		}
	  }
	  ePos--;
	}
	let ePos1 = ePos - 1;
	while (true)
	{
	  if (S[ePos1] === "a") {
		break;
	  }
	  ePos1--;
	}
	return (sPos1 - sPos) * (ePos - ePos1);
}