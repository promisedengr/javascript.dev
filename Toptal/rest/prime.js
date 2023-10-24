function prime(n) {
  let i = 2;
  let q = Math.sqrt(n);
  while (n % i === 0) {
    console.log(i + ' ');
    n = n / i;
  }
  
  for (i = 3; i <= q; i++) {
    while (n % i === 0) {
      console.log(i + ' ');
      n = n / i;
    }
  }

  if (n > 2) console.log(n);
}

prime(15);
