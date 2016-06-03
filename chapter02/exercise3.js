var height = 6;
var width = 20;

for (var i = 0; i < height; i++) {
  var row = '';
  for (var j = 0; j < width; j++) {
    if (i % 2 === 0) {
      if (j % 2 === 0) {
        row = row + ' ';
      } else {
        row = row + '#';
      }
    } else {
      if (j % 2 === 0) {
        row = row + '#';
      } else {
        row = row + ' ';
      }
    }
  }

  console.log(row);
}
