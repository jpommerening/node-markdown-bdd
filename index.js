var fs = require('fs');
var async = require('async');
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
  var entries = [];
  var ready = false;

  context = filter.pop();

  var cs = fs.createReadStream(file).pipe(mdCodeStream());

  cs.on('entry', function(entry) {
      entry.pause();
      entries.push(entry);
    })
    .on('finish', function() {
      ready = true;
    });

  function onReady(callback) {
    if (ready) {
      callback();
    } else {
      cs.on('finish', callback);
    }
  }

  return function example(name, callback) {
    var section;
    var matching;

    filter.push(name);
    section = filter.slice();

    describe(name, function () {
      before(function (done) {
        onReady(function() {
          matching = entries.filter(function (entry) {
            return containedInOrder(section, entry.section);
          });

          if (matching) {
            async.each(matching, function(entry, done) {
              return entry.pipe(evalStream(context, done));
            }, done);
          } else {
            done(new Error('No code blocks in section ' + section.join(' - ')));
          }
        });
      });

      callback();
    });

    filter.pop();
  };
};

