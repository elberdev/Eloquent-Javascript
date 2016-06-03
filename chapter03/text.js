var square = function(x) {
  return x * x;
};

console.log(square(3));

var makeNoise = function() {
  console.log('Pling!');
};

makeNoise();

/*
It's possible to use this function with just one argument. JS just assigns
'undefined' to the other value. we must be aware of that in our function
implementations.
*/
var power = function (base, exponent) {
  if (exponent === undefined) {
    exponent = 2;
  }

  var result = 1;
  for (var count = 0; count < exponent; count++) {
    result *= base;
  }

  return result;
};

console.log(power(2));
console.log(power(2, 10));

var x = 'outside';

var f1 = function () {
  var x = 'inside f1';
};

f1();
console.log(x);

var f2 = function () {
  x = 'inside f2';
};

f2();
console.log(x);

var landscape = function () {
  var result = '';
  var flat = function (size) {
    for (var count = 0; count < size; count++) {
      result += '_';
    }
  };

  var mountain = function (size) {
    result += '/';
    for (var count = 0; count < size; count++) {
      result += "'";
    }

    result += '\\';
  };

  flat(3);
  mountain(4);
  flat(6);
  mountain(1);
  flat(1);
  return result;
};

console.log(landscape());

console.log('The Future says: ', future());

/*
This is a function declaration that does not store the function inside a variable.
Do NOT make these declarations inside of blocks [different platforms handle that
differently, so just don't]! As you can see, this function declaration can be
placed after the function is called and it still works. Function declarations
are not part of the top to bottom logic of a js file.
*/
function future() {
  return 'We STILL have no flying cars';
}

/*
This following bit of code causes an infinite call stack, which causes the
execution to be interrupted.
*/

// function chicken() {
//   egg();
// }

// function egg() {
//   chicken();
// }

// console.log(chicken() + 'came first');

function wrapValue(n) {
  var localVariable = n;
  return function () { return localVariable; };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);
console.log(wrap1());
console.log(wrap2());

function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

var twice = multiplier(2);
console.log(twice(5));

/*
RECURSION
*/
function powerRecursive(base, exponent) {
  if (exponent === 0) {
    return 1;
  } else {
    return base * power(base, exponent - 1);
  }
}

console.log(powerRecursive(2, 3));

function findSolution(target) {
  function find(start, history) {
    if (start == target) {
      return history;
    } else if (start > target) {
      return null;
    } else {
      return find(start * 3, '(' + history + ' * 3)') ||
        find(start + 5, '(' + history + ' + 5)');
    }
  }

  return find(1, '1');
}

console.log(findSolution(24));

function zeroPad(number, width) {
  var numberString = String(number);
  while (numberString.length < width) {
    numberString = '0' + numberString;
  }
  return numberString;
}

function printFarmInventory(cows, chickens, pigs) {
  console.log(zeroPad(cows, 3) + ' cows');
  console.log(zeroPad(chickens, 3) + ' chickens');
  console.log(zeroPad(pigs, 3) + ' pigs');
}

printFarmInventory(7, 11, 33);
