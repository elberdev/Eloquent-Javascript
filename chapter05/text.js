

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

/* APPLY applies a function to every member of an array */

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

// but let's use the buit-in filter function that every array has...

/* FILTER narrows down an array based on a specific test */
console.log(ancestry.filter(function(person) {
  return person.father == 'Carel Haverbeke';
}));

/* MAP applies a function to an array and transforms it into a new array */
function map(array, transform) {
  var mapped = [];
  for (var i = 0; i < array.length; i++) {
    mapped.push(transform(array[i]));
  }

  return mapped;
}

var overNinety = ancestry.filter(function(person) {
  return person.died - person.born > 90;
});

// Let's use our filtered array of people who lived over ninety
// to produce an array with only their names using map()
console.log(map(overNinety, function(person) {
  return person.name;
}));

// map is also a standard method on arrays
console.log(overNinety.map(function(person) {
  return person.name;
}));

/* REDUCE is a function which is used to compute a final value from all members
in an array */

function reduce(array, combine, start) {
  var current = start;
  for (var i = 0; i < array.length; i++) {
    current = combine(current, array[i]);
  }

  return current;
}

console.log(reduce([1, 2, 3, 4], function(a, b) {
  return a + b;
}, 0));

// in the built-in reduce method in arrays you can leave out the start
// argument. It assumes it's the first member.
console.log(ancestry.reduce(function(min, cur) {
  if (cur.born < min.born) {
    return cur;
  } else {
    return min;
  }
}));

// our version
var min = ancestry[0];
for (var i = 1; i < ancestry.length; i++) {
  var cur = ancestry[i];
  if (cur.born < min.born) {
    min = cur;
  }
}

console.log(min);

// we lamely have to define plus as a function here because it is not
// treated as a function in javascript.
function average(array) {
  function plus(a, b) {
    return a + b;
  }

  return array.reduce(plus) / array.length;
}

function age(p) { return p.died - p.born; }

function male(p) { return p.sex == 'm'; }

function female(p) { return p.sex == 'f'; }

console.log(average(ancestry.filter(male).map(age)));
console.log(average(ancestry.filter(female).map(age)));

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

//console.log(byName['Philibert Haverbeke']);

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    console.log(person);
    if (person === undefined) {
      return defaultValue;
    } else {
      return f(person, valueFor(byName[person.mother]), valueFor(byName[person.father]));
    }
  }

  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == 'Pauwels van Haverbeke') {
    return 1;
  } else {
    return (fromMother + fromFather) / 2;
  }
}

var ph = byName['Philibert Haverbeke'];
console.log(reduceAncestors(ph, sharedDNA, 0) / 4);
