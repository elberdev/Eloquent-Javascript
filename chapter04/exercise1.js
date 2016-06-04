/* making our own range and sum functions */

function myRange(begin, end, step) {
  if (!step && end >= begin) {
    step = 1;
  } else {
    step = -1;
  }

  var array = [];

  if (step > 0) {
    for (var i = begin; i <= end; i += step) {
      array.push(i);
    }
  } else {
    for (var j = begin; j >= end; j += step) {
      array.push(j);
    }
  }

  return array;
}

console.log(myRange(3, 10));

function mySum(array) {
  var sum = 0;
  for (var i = 0; i < array.length; i++) {
    sum += array[i];
  }

  return sum;
}

console.log(mySum(myRange(1, 10)));
console.log(myRange(5, 2, -1));
console.log(myRange(33, 2, -5));
console.log(myRange(55, 40));
