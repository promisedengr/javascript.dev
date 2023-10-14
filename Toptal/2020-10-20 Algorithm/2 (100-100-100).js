function Solution(S, k) {
    const n = S.length
    if (k >= n) return 0
    const data = [{
        value: S[0],
        leftCount: 1, // count of same characters in a row
        leftLength: 1, // length of left info from the beginning
    }]
    
    let count = 1   // count of same characters in a row for each position
    let leftLength = 1
    for (let i = 1; i < n; i ++) {
        if (S[i] == S[i - 1]) {
            count = count + 1
            if (count == 2 || (count.toString().length > (count-1).toString().length)) leftLength++
        } else {
            count = 1
            leftLength += 1
        }
        data.push({
            i,
            value: S[i],
            leftCount: count,
            leftLength,
        })
    }

    data[n-1].rightCount = 1
    data[n - 1].rightLength = 1
    count = 1
    let rightLength = 1
    for (i = n - 2; i >= 0; i--) {
        if (S[i] == S[i + 1]) {
            count = count + 1
            if (count == 2 || count.toString().length > (count-1).toString().length) rightLength++
        } else {
            count = 1
            rightLength += 1
        }
        data[i].rightCount = count
        data[i].rightLength = rightLength
    }

    let startIndex = 0
    let minLength = data[k].rightLength
    for (i = 1 ; i < n - k; i ++) {
        // i-1 : c1     i + k : c2
        const start = data[i - 1]
        const end = data[i + k]
        let curLength
        
        if (start.value != end.value) {
            curLength = start.leftLength + end.rightLength
        } else {
            curLength = start.leftLength + end.rightLength - (2 + (start.leftCount == 1 ? 0 : start.leftCount.toString().length) + (end.rightCount == 1 ? 0 : end.rightCount.toString().length)) +(start.leftCount + end.rightCount).toString().length + 1
        }

        if (minLength > curLength) {
            minLength = curLength
            startIndex = i
        }
    }
    if (minLength > data[n - k - 1].leftLength) {
        minLength = data[n - k - 1].leftLength
        startIndex = n - k - 1
    }

    return minLength
}



input1 = "AAAAAAAAAAABXXAAAAAAAAAA"
input2 = "ABBBCCDDCCC"
input3 = "ABCDDDEFG"
input4 = "AAAABB"
input5 = "AABBBAAAAA"
input6 = "AAAABBCCDAAAAA"
input7 = "AAAAAAABBBAAAA"

console.log(Solution(input1, 3)) //3
console.log(Solution(input2, 3)) //5
console.log(Solution(input3, 2)) //6
console.log("-------------------")
console.log(Solution(input4, 2)) //2
console.log(Solution(input4, 6)) //0
console.log(Solution(input5, 2)) //4
console.log(Solution(input5, 3)) //2
console.log("-------------------")
console.log(Solution(input6, 2)) //7
console.log(Solution(input6, 3)) //6
console.log(Solution(input6, 4)) //5
console.log(Solution(input6, 5)) //2
console.log("-------------------")
console.log(Solution(input7, 3)) //3
console.log(Solution(input7, 4)) //3
console.log(Solution(input7, 5)) //2