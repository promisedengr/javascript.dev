function borderSums(matrix) {
    let d = 0
    const size = matrix.length - 1
    const result = []

    while(d <= size / 2) {
        let sum = 0
        if (d * 2 == size) {
            result.push(matrix[d][d])
        } else {
            for (let i = d ; i <= size - d; i++){
                sum += (matrix[d][i] + matrix[size-d][i] + matrix[i][d] + matrix[i][size-d])
            }
            sum -= (matrix[d][d] + matrix[size-d][size-d] + matrix[d][size-d] + matrix[size-d][d])
            result.push(sum)
        }
        d ++
    }

    return result
}

// matrix = [[1,  2,  2],
//           [0,  1,  0],
//           [4, -1, -1]]
// console.log(borderSums(matrix))

// matrix1 = [[1,  2,  2,  3],
//           [0,  1,  0,  2],
//           [4, -1, -1, -3],
//           [4, -1, -1,  3]]
// console.log(borderSums(matrix1))

matrix2 = [[1,  2,  2,  3, 1],
          [0,  1,  0,  2, 1],
          [4, -1, -1, -3, 1],
          [4, -1, -1,  3, 1],
        [0,0,0,0,0]]
console.log(borderSums(matrix2))
