var mdCodeStream = require('md-code-stream');
var evalStream = require('eval-stream');

// Test that each item in needle is contained in haystack
// in the right order.
function containedInOrder(needle, haystack) {
  var i, j = 0;
  for (i = 0; i < needle.length; i++) {
    while (j < haystack.length && needle[i] !== haystack[j]) j++;
  }
  return i === needle.length && j < haystack.length;
}

module.exports = function(file, context) {
  var filter = [].slice.call(arguments, 1);
  context = filter.pop();

  return function example(name, callback) {
  };
};

