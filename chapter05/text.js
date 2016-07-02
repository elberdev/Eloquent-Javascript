function forEach(array, action) {
  for (var i = 0; i < array.length; i++) {
    action(array[i]);
  }
}

forEach(['stuff', 'is', 'bananas'], console.log);

var numbers = [1, 2, 3, 4, 5]; 
var sum = 0;
forEach(numbers, function(number) {
  sum += number;
});

console.log(sum);

/*
  Higher order functions
  (functions that manipulate other functions
*/

function greaterThan(n) {
  return function(m) { return m > n; };
}

var greaterThan10 = greaterThan(10);
console.log(greaterThan10(11));

function noisy(f) {
  return function(arg) {
    console.log('calling with', arg);
    var val = f(arg);
    console.log('called with', arg, '- got', val);
    return val;
  };
}

noisy(Boolean)(0);
