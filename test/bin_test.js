suite('mozilla-get-url extensibility', function() {
  test('can load program without executing it', function() {
    var bin = require('../bin/mozilla-get-url');

    assert.equal(typeof bin, 'object');
    assert.ok(!bin.os);
  });
});
