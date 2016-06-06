function reverse(array) {
  var reverse = [];
  for (var i = 0; i < array.length; i++) {
    reverse.push(array.unshift());
  }

  return reverse;
}

console.log(reverse([3, 4, 6, 9]));
