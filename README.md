# markdown-bdd

> Use code blocks from markdown documents in your tests.

Take this README file for example. There are multiple code blocks
in here, that serve as usage examples for the user.
However, since these examples are supposed to _describe_ what the
module does, why not go ahead and use them as the specification?

## Usage Example

Ok, hang on, I'll explain later. First have a look at this example:

```js
var markdownBdd = require('markdown-bdd');

// declare what to use as input and what global variables to assume
var example = markdownBdd('README.md', {
  describe: describe,
  example: function() {},
  it: it
});

describe('markdown-bdd', function() {
  example('Usage Example', function() {
    it('should be runnable with mocha', function (done) {
      // ...
    });
  });
});
```

