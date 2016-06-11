function deepEqual(a, b) {
  if ((typeof a == 'object' && a !== null) &&
    (typeof b == 'object' && b !== null)) {

    var keysA = Object.keys(a);
    var keysB = Object.keys(b);
    if (keysA === null) {
      return true;
    } else if (keysA.length === keysB.length) {
      for (var i = 0; i < keysA.length; i++) {
        if (keysA[i] === keysB[i]) {
          continue;
        } else {
          return false;
        }
      }

      for (var j = 0; j < keysA.length; j++) {
        if (deepEqual(a[keysA[j]], b[keysB[j]])) {
          continue;
        } else {
          return false;
        }
      }

      return true;
    }
  }

  return false;
}

var obj =  { here: { is: 'an' }, object: 2 };
var obj2 = { here: 1, object: 2 };
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, obj2));
