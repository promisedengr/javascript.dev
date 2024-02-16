module.exports._formatMoney = (num, digit) => {
  var tmp = Number(parseFloat(num).toFixed(digit))
  var arr = String(tmp).split('.')
  arr[0] = arr[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  if(arr.length>1) {
    arr[0] = arr[0] + '.' + arr[1]
  }
  return arr[0]
}

module.exports._formatDate = (date_obj) => {
  var tmp = date_obj.split('T');
  tmp = tmp[0].split('-')
  return tmp[1] + '/' + tmp[2] + '/' + tmp[0]
}