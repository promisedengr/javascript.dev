const rect1 = {
  a: { x: 5, y: 5 },
  b: { x: 15, y: 25 }
}
const rect2 = {
    a: { x: -1 , y: -4 },
    b: { x: 6 , y: 28 }
}
const checkIntersection = () => {
  console.log('check')
  if ((Math.min(rect1.b.x, rect2.b.x) > Math.max(rect1.a.x, rect2.a.x)) && 
     (Math.min(rect1.b.y, rect2.b.y) > Math.max(rect1.a.y, rect2.a.y))) 
  {
    return true
  }
  else
    return false
}
let result = checkIntersection()
console.log(result)