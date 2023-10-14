//[0, 1, 2, -2, 0, 3, 4] => [-2, 0, 3, 4]
//[0, 1, -3, 4] => [[0, 1], [-3, 4]]

function getLongestSequence(arr) {
	let result = [], stack = [], maxLength =  0, prev = -Infinity
  
  arr.forEach((item, index) => {
  	console.log(stack)
  	if(item > prev) {
    	stack.push(item)
      prev = item
      if(maxLength < stack.length) {
      	result = [stack]
      } else if(maxLength === stack.length) {
      	result.push(stack)
      }
    } else {
    	if(maxLength < stack.length) {
      	result = [stack]
        maxLength = stack.length
      } else if(maxLength === stack.length) {
      	result.push(stack)
      }
      
      stack = [item]
      prev = item
    }
    
    
  })
  return result
}

console.log(getLongestSequence([-1, 0, -2, 3, 4, 1, 2, 3]))