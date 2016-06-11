function arrayToList(array) {
  var list = null;
  for (var i = array.length; i > 0; i--) {
    var index = i - 1;
    var value = array[index];
    list = { value: value, rest: list };
  }

  return list;
}

function listToArray(list) {
  var array = [];
  while (list !== null) {
    array.push(list.value);
    list = list.rest;
  }

  return array;
}

function prepend(value, list) {
  return { value: value, rest: list };
}

function nth(list, index) {
  for (var i = 0; i < index; i++) {
    if (list.rest === null) {
      return null;
    } else {
      list = list.rest;
    }
  }

  return list.value;
}

console.log(arrayToList([3, 6, 9]));
console.log(prepend(10, prepend(20, null)));
console.log(listToArray(arrayToList([3, 6, 9])));
console.log(nth(arrayToList([3, 4, 5, 6]), 3));
