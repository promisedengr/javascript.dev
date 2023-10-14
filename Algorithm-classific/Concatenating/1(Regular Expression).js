function check(arr) {
  const length = arr.length
  let tmp = length
  let arr1 = []
  let result = []

  arr.sort(function(a,b) {
    return b.length - a.length
  })
  arr1 = arr.map((item) => {
    return item
  })

  while(tmp >= 0) {
    for(let i = length-tmp+1; i < length; i++) {
      if(arr[length-tmp].includes(arr[i])){
        var re = new RegExp(arr[i], 'g')
        arr[length-tmp] = arr[length-tmp].replace(re, '')
      } 
    }
    if(arr[length-tmp] == '') {
      result.push(arr1[length-tmp])
    }
    tmp--
  }

  return result
}
