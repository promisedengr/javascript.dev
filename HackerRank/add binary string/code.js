const binary = addBinaryStrings('a', 'cb')
console.log(binary)
function addBinaryStrings(a, b) {
  let carry = 0
  let result = ''
  let i = a.length - 1
  let j = b.length - 1
  while (i >= 0 || j >= 0) {
      let num1 = i < 0 ? 0 : a[i] | 0
      let num2 = j < 0 ? 0 : b[j] | 0
      carry += num1 + num2
      result = (carry % 2) + result
      carry = (carry / 2) | 0
      i--
      j--
  }
  if (carry) {
      result = carry + result
  }
  return result
}
