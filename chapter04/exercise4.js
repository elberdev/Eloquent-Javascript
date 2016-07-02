function deepEqual(a, b) {
  if ((typeof a == 'object' && a !== null) &&
    (typeof b == 'object' && b !== null)) {

    var keysA = Object.keys(a);
    var keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
      return false;
    } else {
      for (var j = 0; j < keysA.length; j++) {
        if (keysA[j] !== keysB[j]) {
          return false;
        }

        if (deepEqual(a[keysA[j]], b[keysB[j]])) {
          continue;
        } else {
          return false;
        }
      }

      return true;
    }
  }

  return a === b;
}

var obj =  { here: { is: 'an' }, object: 2 };
var obj2 = { here: 1, object: 2 };
var obj3 = { hey: 'there' };
var obj4 = { hi: 'there' };
console.log(deepEqual(obj, obj));
console.log(deepEqual(obj, { here: { is: 'an' }, object: 2 }));
console.log(deepEqual(obj, obj2));
var x = 3;
console.log(deepEqual(x, 3));
console.log(deepEqual(obj3, obj4));
