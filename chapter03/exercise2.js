function isEven(number) {
  if (number === 0) {
    return true;
  } else if (Math.abs(number) === 1) {
    return false;
  } else {
    return isEven(Math.abs(number) - 2);
  }
}

console.log(isEven(25));
console.log(isEven(76));
console.log(isEven(-1));
console.log(isEven(-30));
