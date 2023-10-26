/*
You are given a NxM matrix. Every element in the matrix represents a position on a minesweeper game board. 
An element can either be "O", meaning that it's empty, or "X", meaning that the position contains a mine.

Your task is to devise a function that, given the input matrix defined above,
 prints a transformed matrix in which every empty cell is replaced by the number of mines in the Moore neighborhood of that specific cell.
  Your function should print to the console and the print output should be formatted so that each row in the matrix represents a single line.

For example:

X O O      X 1 0
O O O  ->  3 3 1
X X O      X X 1


The Moore neighborhood is defined by the eight cells surrounding the cell, the four directly next to it and four diagonal to it.

The input is a an array of strings, with each element representing a row in the matrix.

==========
Test case:

test1 = ["XOOXXXOO", "OOOOXOXX", "XXOXXOOO", "OXOOOXXX", "OOXXXXOX", "XOXXXOXO", "OOOXOXOX", "XOXXOXOX"]
minesweeper(test1); // should print

X 1 1 X X X 3 2
3 3 3 5 X 5 X X
X X 3 X X 5 5 4
3 X 5 5 6 X X X
2 4 X X X X 6 X
X 3 X X X 5 X 3
2 4 5 X 6 X 5 X
X 2 X X 4 X 4 X


==========
Test case:

test2 = ["OOOXXXOXX", "XXXXXXOXX", "XOOXXXXXX", "OOXXOXOXX", "XXXXXXXXX"]
minesweeper(test2); // should print

2 3 4 X X X 4 X X
X X X X X X 7 X X
X 5 6 X X X X X X
3 5 X X 8 X 8 X X
X X X X X X X X X

===========
Edge cases:
- A one-cell matrix with an empty cell (should output 0)
- A one-cell matrix with a single mine (should output the input matrix)

==============
More examples:

test3 = ["OOOOOOO", "XOOOOOO", "OXOOXOX", "OOOOOOX", "OOOOOOO", "OOXOXXX", "XOXOOOO"]
minesweeper(test3); // should print

OUTPUT:
1 1 0 0 0 0 0
X 2 1 1 1 2 1
2 X 1 1 X 3 X
1 1 1 1 1 3 X
0 1 1 2 2 4 3
1 3 X 3 X X X
X 3 X 3 2 3 2
*/

// function minesweeper(input) {
//   const rows = input.length;
//   const cols = input[0].length;
//   let result = [];

//   const calcMooreNeighbor = (row, col) => {
//     let count = 0;

//     if (input[row][col] === "X") {
//       return "X";
//     }

//     for (let i = 0; i < rows; i++) {
//       for (let j = 0; j < cols; j++) {
//         if (Math.abs(i - row) <= 1 && Math.abs(j - col) <= 1) {
//           if (i !== row || j !== col) {
//             if (input[i][j] === "X") {
//               count++;
//             }
//           }
//         }
//       }
//     }

//     return count;
//   };

//   for (let k = 0; k < rows; k++) {
//     result.push([]);
//     for (let p = 0; p < cols; p++) {
//       result[k].push(calcMooreNeighbor(k, p));
//     }
//     result[k] = result[k].join(" ");
//   }
//   result = result.join("\n");

//   console.log("Solution\n", result.toString());
// }

const minesweeper = arr => {
  let { length: rows } = arr;
  let { length: cols } = arr[0];
  for (let row = 0; row < rows; row++) {
    let result = "";
    for (let col = 0; col < cols; col++) {
      result = `${result}${getCellValue(arr, row, col)} `;
    }
    console.log(result);
  }
};

const getCellValue = (arr, row, col) => {
  if (arr[row][col] == "X") return "X";
  let { length: rows } = arr;
  let { length: cols } = arr[0];
  let currentRow, currentCol;
  let result = 0;
  // console.log(arr);
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      courrntRow = row + i;
      currentCol = col + j;
      if (courrntRow < 0 || courrntRow >= rows) continue;
      if (currentCol < 0 || currentCol >= cols) continue;
      // console.log(arr[courrntRow], courrntRow);
      if (arr[courrntRow][currentCol] == "X") result++;
    }
  }
  return result;
};
test3 = [
  "OOOOOOO",
  "XOOOOOO",
  "OXOOXOX",
  "OOOOOOX",
  "OOOOOOO",
  "OOXOXXX",
  "XOXOOOO"
];
minesweeper(test3); // should print
test2 = ["OOOXXXOXX", "XXXXXXOXX", "XOOXXXXXX", "OOXXOXOXX", "XXXXXXXXX"];
minesweeper(test2);
test1 = [
  "XOOXXXOO",
  "OOOOXOXX",
  "XXOXXOOO",
  "OXOOOXXX",
  "OOXXXXOX",
  "XOXXXOXO",
  "OOOXOXOX",
  "XOXXOXOX"
];
minesweeper(test1);
