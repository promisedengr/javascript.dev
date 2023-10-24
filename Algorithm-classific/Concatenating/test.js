/*
Given an array of strings `s`, find all of the strings in `s` that are made by concatenating 2 or more strings from `s`.
 
Examples:
Input
['a', 'b', 'c', 'abc']
Output
['abc']
 
Input
['a', 'b', 'c', 'cb', 'abc']
Output
['cb', 'abc']
 
Input
['do', 'dog']
Output
[]
 
Input
['dogdogbat', 'bat', 'cat', 'dog']
Output
['dogdogbat']
 
Input
['dogdogbatx', 'bat', 'cat', 'dog']
Output
[]
*/
function call(array){

  let temArray  = [...array]
  let resultArray  = [...array]
  let result = []
  while(array.length>0){
    
    let long =  array.reduce(function(a, b) {
      return a.length >= b.length ? a : b;
    })
 
    temArray.forEach((item, index ) => {
      if(item.includes(long) && index !== temArray.indexOf(long))
      {
        temArray[index] = item.replaceAll(long,'')
        //  console.log( temArray[index])
      }

    })

    array = array.filter(function(item) {
     return item !== long
     })
    // console.log(array)
  }
   // console.log(temArray)
  temArray.forEach((item, index ) => {
    if(item == '')
    {
      result.push(resultArray[index])
    }

  })
 
  console.log(result)
}

call(['a', 'b', 'c', 'cb', 'abc'])

call(['dogdogbatt', 'bat', 'cat', 'dog'])

call(['dogdogbatx', 'bat', 'cat', 'dog'])