function flattenList(arrs) {
  let result = [];
  arrs.forEach(item => {
    if (Array.isArray(item)) {
      result = result.concat(flattenList(item));
    } else {
      result.push(item);
    }
  });

  return result;
}

console.log(flattenList(["This is a string", 1, 2, [3], [4, [5, 6]], [[7]], 8, "[10, 11]"]));

console.log(flattenList([1, 2, [3], [4, [5, 6], 5, 6], [[7], [8, [9]]], 10]));
// [1, 2, 3, 4, 5, 6, 5, 6, 7, 8, 9, 10] 
console.log(flattenList([1, 2, [3], [4, [5, 6], 5, 6], [[7], [8, [9]]], 10, [[[11], 12]]]));
// [1, 2, 3, 4, 5, 6, 5, 6, 7, 8, 9, 10, 11, 12] 
console.log(flattenList([1, "a", "b", [ "c", ["d",2 ] ], "e", [ [ [ "f" ] ] ] ]));
// [ 1, "a", "b", "c", "d", 2, "e", "f" ]