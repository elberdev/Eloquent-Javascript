function reverse(array) {
  var reverse = [];
  var items = array.length;
  for (var i = items; i > 0; i--) {
    reverse.push(array.pop());
  }

  return reverse;
}

console.log(reverse([3, 4, 6, 9]));

function reverseInPlace(array) {
  for (var i = 0; i < array.length / 2; i++) {
    var toShift = array[array.length - 1 - i];
    array[array.length - 1 - i] = array[i];
    array[i] = toShift;
  }
  return array;
}

console.log(reverseInPlace([9, 5, 2, -1]));
console.log(reverseInPlace([9, 3, 2, 0, -3]));
