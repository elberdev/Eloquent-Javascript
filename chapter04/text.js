
var numbers = [3, 5, 7, 11, 63];
console.log(numbers[1]);

/* string methods */
var doh = 'Doh!';
console.log(typeof doh.toUpperCase);
console.log(doh.toUpperCase());
console.log(doh.toLowerCase());

/* array methods */
var mack = [];
mack.push('Mack');
mack.push('the', 'knife');
console.log(mack);
console.log(mack.join(' '));
console.log(mack.pop());
console.log(mack);

/* this is how you declare an object with some properties */
var day1 = {
  squirrel: false,
  events: ['work', 'touched tree', 'pizza', 'running', 'television']
};

console.log(day1.squirrel);
console.log(day1.events);
console.log(day1.wolf);
day1.wolf = false;
console.log(day1.wolf);

var descriptions = {
  work: 'went to work',

  // this next one has a property name that is not normally valid 
  // (the space in there is illegal for a variable name), so it needs
  // quotes.
  'touched tree': 'touched a tree!'
};

var anObject = { left: 1, right: 2 };
console.log(anObject.left);

// deletes the whole property from the object, not just the value
delete anObject.left;
console.log('left' in anObject);
console.log('right' in anObject);

var journal = [
  {
    events: ['work', 'touched tree', 'pizza', 'running', 'television'],
    squirrel: false
  },
  { events: ['work', 'ice cream', 'cauliflower', 'lasagna', 'touched tree', 'brushed teeth'],
    squirrel: false
  },
  {
    events: ['weekend', 'cycling', 'break', 'peanuts', 'beer'], squirrel: true
  }
];

// objects are passed by REFERENCE
var object1 = { value: 10 };
var object2 = object1;
var object3 = { value: 10 };

console.log(object1 == object2);
console.log(object1 == object3);

object1.value = 15;
console.log(object2.value);
console.log(object3.value);

// js doesn't care if we assign a variable to the same name as a
// prior one. It just throws out the old one.
var journal = [];

function addEntry(events, didITurnIntoASquirrel) {
  journal.push({
    events: events,
    squirrel: didITurnIntoASquirrel
  });
}

addEntry(['work', 'touched tree', 'pizza', 'running', 'television'], false);
addEntry(['work', 'ice cream', 'cauliflower', 'lasagna', 'touched tree', 'brushed teeth'], false);
addEntry(['weekend', 'cycling', 'break', 'peanuts', 'beer'], true);

function phi(table) {
  // this is the formula to calculate the correlation between two items on the journal
  // events list, so we can figure out why this dude is turning into a were-squirrel.
  // phi-coefficient:
  return (
    (table[3] * table[0] - table[2] * table[1]) /
    Math.sqrt(
      (table[2] + table[3]) *
      (table[0] + table[1]) *
      (table[1] + table[3]) *
      (table[0] + table[2])
    )
  );
}

/*
  we use a binary notation here where:

    0 == 00 (no occurrences of either item)
    1 == 01 (first item doesn't occur, but second does)
    2 == 10 (first item occurs, but second doesn't)
    3 == 11 (both items occur)

  we use this data to figure out the correlation (phi coefficient) between the two items
*/

console.log(phi([76, 9, 4, 1]));

var journalData = require('./jacques_journal');

console.log(journalData[0]);

function hasEvent(event, entry) {

  // return whether the index for the desired event exists
  return entry.events.indexOf(event) != -1;
}

function tableFor(event, journal) {
  var table = [0, 0, 0, 0];
  for (var i = 0; i < journal.length; i++) {

    // two variable declarations in one line
    var entry = journal[i], index = 0;
    if (hasEvent(event, entry)) {
      index += 1;
    }

    if (entry.squirrel) {
      index += 2;
    }

    table[index] += 1;
  }

  return table;
}

var pizzaTable = tableFor('pizza', journalData);
var pizzaCorrelation = phi(pizzaTable);
console.log(pizzaCorrelation);

// this is javascript's version of a dictionary
var map = {};
function storePhi(event, phi) {
  map[event] = phi;
}

storePhi('pizza', 0.069);
storePhi('touched tree', -0.081);
console.log('pizza' in map);
console.log('touched tree' in map);
console.log(map['touched tree']);

for (var event in map) {
  console.log("The correlation for '" + event + "' is " + map[event]);
}

function gatherCorrelations(journal) {

  // correlations map
  var phis = {};

  // loop through the entries
  for (var entry = 0; entry < journal.length; entry++) {

    // get the events for each entry
    var events = journal[entry].events;

    // go through each event
    for (var i = 0; i < events.length; i++) {
      var event = events[i];

      // compute the correlation for each event
      // and add it to phis if it hasn't been computed yet
      if (!(event in phis)) {
        phis[event] = phi(tableFor(event, journal));
      }
    }
  }

  return phis;
}

var correlations = gatherCorrelations(journalData);
console.log(correlations.pizza);

for (var event in correlations) {
  var correlation = correlations[event];
  if (correlation > 0.1 || correlation < -0.1) {
    console.log(event + ': ' + correlation);
  }
}

for (var i = 0; i < journalData.length; i++) {
  var entry = journalData[i];
  if (hasEvent('peanuts', entry) && !hasEvent('brushed teeth', entry)) {
    entry.events.push('peanut teeth');
  }
}

console.log(phi(tableFor('peanut teeth', journalData)));

// this is how you make a queue
var toDoList = [];
function rememberTo(task) {
  toDoList.push(task);
}

function whatIsNext() {
  // this method dequeues
  return toDoList.shift();
}

function urgentlyRememberTo(task) {
  // this method puts the new value IN THE BEGINNING of the array
  toDoList.unshift(task);
}

console.log([1, 2, 3, 2, 5].indexOf(2));

// this one gets the index of the LAST occurrence of the value
console.log([1, 2, 3, 2, 5].lastIndexOf(2));

// some uses of the slice function
console.log([0, 1, 2, 3, 4].slice(2, 4));
console.log([0, 1, 2, 3, 4].slice(2));

// also check out concat
function remove(array, index) {
  return array.slice(0, index).concat(array.slice(index + 1));
}

console.log(remove(['a', 'b', 'c', 'd', 'e'], 2));

/* String properties and methods */

// you cannot set a new property on strings, numbers and Booleans because they are not objects
var myString = 'Fido';
myString.myProperty = 'value';
console.log(myString.myProperty);

console.log('coconuts'.slice(4, 7));
console.log('coconuts'.indexOf('u'));

// the string version of indexOf can also take more than one character unlike its array counterpart
console.log('one two three'.indexOf('ee'));

console.log('    okay \n'.trim());

var string = 'abc';
console.log(string.length);
console.log(string.charAt(0));
console.log(string[1]);

function noArguments() {}

noArguments(1, 2, 3); // js allows this

function threeArguments(a, b, c) {}

threeArguments(); // and this

// in js, all functions have an 'arguments' property that keeps track of the arguments passed in
function argumentCounter() {
  console.log('You gave me ' + arguments.length + ' arguments');
}

argumentCounter('straw man', 'tautology', 'ad hominem');

// an alternative to the last addEntry function, using the 'arguments' property
function addEntry(squirrel) {
  var entry = { events: [], squirrel: squirrel };
  for (var i = 0; i < arguments.length; i ++) {
    entry.events.push(arguments[i]);
  }

  journal.push(entry);
}

