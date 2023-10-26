function solution(S, X, Y) {
  const obj = {}
  for (let i = 0; i < S.length; i ++) {
    const curData = obj[`d${X[i] * X[i] + Y[i] * Y[i]}`] || {}
    if (curData[S[i]]) {
      curData.selfDuplicate = true
    } else {
      curData[S[i]] = 1
    }
    obj[`d${X[i] * X[i] + Y[i] * Y[i]}`] = curData
  }

  const keys = Object.keys(obj)
  keys.sort((a,b) => parseInt(a.substr(1)) - parseInt(b.substr(1)))
  
  let pointCount = 0
  let pointsData = {}

  for (i = 0; i < keys.length; i++) {
    const curPoints = obj[keys[i]]
    if (curPoints.selfDuplicate) return pointCount

    pointsData = {...pointsData, ...curPoints}

    if ((pointCount + Object.keys(curPoints).length) != Object.keys(pointsData).length) return pointCount
    pointCount += Object.keys(curPoints).length
  }
  return pointCount
}

let S = "ABDCA", X = [2, -1, -4, -3, 3], Y = [2, -2, 4, 1, -3]
console.log(solution(S, X, Y))    // 3

 S = "ABB", X = [1, -2, -2], Y = [1, -2, 2]
console.log(solution(S, X, Y))    // 1

S = "CCD", X = [1, -1, 2], Y = [1, -1, -2]
console.log(solution(S, X, Y))    // 0

S = "CCD", X = [0, -1, 2], Y = [1, -1, -2]
console.log(solution(S, X, Y))    // 1

S = "A", X = [0], Y = [0]
console.log(solution(S, X, Y))   // 1


