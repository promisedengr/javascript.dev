function solution(T) {
  let startingIndex = -1;
  const N = T.length;
  let destinations = new Array(N).fill(-1);
  let distances = new Array(N-1).fill(0);
  T.forEach((element, index) => {
    if (element === index) {
      startingIndex = index;
    } else {
      if (destinations[element] === -1) {
        destinations[element] = [];
      } 
      destinations[element].push(index)
    }
  });

  let distanceIndex = 0;
  let directCities = destinations[startingIndex];
  while ( directCities !== -1 && directCities.length !== 0) {
    distances[distanceIndex] = directCities.length;
    directCities = directCities.reduce((acc, element) => (destinations[element] !== -1 ? acc.concat(destinations[element]): acc), []);
    distanceIndex++;
  }
  
  return distances;
}


console.log(solution([9, 1, 4, 9, 0, 4, 8, 9, 0, 1]));
