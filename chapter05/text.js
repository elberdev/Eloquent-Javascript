

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

function unless(test, then) {
  if (!test) then();
}

function repeat(times, body) {
  for (var i = 0; i < times; i++) {
    body(i);
  }
}

// Notice the tricky use of the modulo expression as a boolean
repeat(3, function(n) {
  unless(n % 2, function() {
    console.log(n, 'is even');
  });
});

// javascript functions have an apply method which can apply a function to
// every member of an array.
function transparentWrapping(f) {
  return function() {
    return f.apply(null, arguments);
  };
}

/* JSON */
var string = JSON.stringify({ name: 'x', born: 1980 });
console.log(string);
console.log(JSON.parse(string).born);

var ANCESTRY_FILE = require('./ancestry');
var ancestry = JSON.parse(ANCESTRY_FILE);
console.log(ancestry.length);

// this is a 'pure' function. It does not modify the array it is given
function filter(array, test) {
  var passed = [];
  for (var i = 0; i < array.length; i++) {
    if (test(array[i])) {
      passed.push(array[i]);
    }
  }

  return passed;
}

console.log(filter(ancestry, function(person) {
  return person.born > 1900 && person.born < 1925;
}));

// but let's use the buit-in filter function that every array has
console.log(ancestry.filter(function(person) {
  return person.father == 'Carel Haverbeke';
}));
