function spiderMove(x, y) {

  x = Math.abs(x);
  y = Math.abs(y);

  var n = [];
  for (var i = 0; i < x + 1; i++) {
    n.push(1);
  }

  for (var i = 0; i < y; i++) {
    for (var j = 1; j < x + 1; j++) {
      n[j] = n[j - 1] + n[j];
    }
  }
  return Math.max(...n);
}
