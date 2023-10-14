/**
 * 
 * @param {number} x x-coordinate
 * @param {number} y y-coordinate
 * @returns distance from original point(0, 0)
 */
function dist(x, y) {
	return Math.hypot(x, y);
}

/**
 * 
 * @param {number} x x-coordinate
 * @param {number} y y-coordinate
 * @param {number} d radius of circle
 * @returns should lie on the boundary of the circle
 */
function isOnBoundary(x, y, d) {
	return Math.abs(dist(x, y) - d) === 0;
}

/**
 * 
 * @param {string} S tags 
 * @param {array} X  x-coordinates
 * @param {array} Y  y-coordinates
 * @returns maximum number of points that can lie inside the circle
 */
function solution(S, X, Y) {
	let orders = X.map((order, index) => index);
	orders = orders.sort(
	  (i, j) => dist(X[i], Y[i]) - dist(X[j], Y[j])
	);
	let circle = new Map();
	let result = 0;
	for (let i = 0; i < orders.length; i++) {
	  const ch = S[orders[i]];
	  if (circle.has(ch)) {
		const radius = dist(X[orders[i]], Y[orders[i]]);
		circle.forEach((index) => {
		  if (isOnBoundary(X[index], Y[index], radius)) {
			result = result - 1;
		  }
		})
		break;
	  }
	  circle.set(ch, orders[i]);
	  result = result + 1;
	}
	return result;
  }